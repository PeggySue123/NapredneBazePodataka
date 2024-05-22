using System.Net;
using System;
using Domain;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.Text;
using Neo4j.Driver;
using Neo4j_Repository.DomainModel;
using Neo4jClient;
using Neo4jClien.Cypher;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Neo4jDrzavaController
    {
        private readonly IDriver _driver;

        public Neo4jDrzavaController()
        {
            _driver = GraphDatabase.Driver("bolt://localhost:7687", AuthTokens.Basic("neo4j", "ElTravel"));   
        }

        public IAsyncSession CreateAsyncSession()
        {
            return Driver.AsyncSession(o => o.WithDatabase("neo4j"));
        }

        [HttpPost]
        public async Task<IActionResult> CreateDrzava(Drzava drzava)
        {
            var session = CreateAsyncSession();
            try
            {
                var query = @"
                    MERGE (drzava:Drzava { ime: $drzava.ime })
                    SET drzava.glavniGrad = $drzava.glavniGrad,
                        drzava.sluzbeniJezik = $drzava.sluzbeniJezik,
                        drzava.opis = $drzava.opis,
                        drzava.gradovi = $drzava.gradovi
                    MERGE (destinacija:Destinacija { name: COALESCE($drzava.gradovi, 'N/A')})
                    MERGE (destinacija)-[:pripadaDrzavi]->(drzava)
                ";
                foreach(Destinacija destinacija in drzava.gradovi){
                    var query1 = @"
                    Merge(destinacija:Destinacija { ime: COALESCE($destinacija, 'N/A')})
                    Merge(destinacija)-[:pripadaDrzavi]->(drzava)";
                    query += query1;
                }

                var parameters = new
                {
                    drzava = drzava.AsDictionary()
                };

                await session.RunAndConsumeAsync(query, parameters);
            }
            finally
            {
                await session.CloseAsync();
            }

        }

        [Route("{id}")]
        public async Task<IActionResult> Index(string id)
        {
            var drzava = await MatchDrzava(id);
            if(drzava == null)
            {
                return StatusCode(404);
            }

            return View("Index", drzava);
        }
        
        private async Task<Drzava> MatchDrzava(string id)
        {
            var session = driver.Session();
            try
            {
                return await session.ReadTransactionAsync(async tx =>
                {
                    var cursor =
                        await tx.RunAsync(
                            "MATCH (drzava:Drzava) WHERE drzava.id = $id " +
                            "OPTIONAL MATCH(drzava)-[:imaGradove]->(gradovi) " +
                            "RETURN drzava, collect(destinacija) AS gradovi",
                            new {id});

                    return new Drzava(await cursor.SingleAsync());
                });
            }
            finally
            {
                if (session != null)
                {
                    await session.CloseAsync();
                }
            }
        }

        [Route("")]
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            return View("Index", await MatchDrzavas());
        }

        private async Task<IEnumerable<Hotel>> MatchDrzavas()
        {
            var session = driver.Session();
            try
            {
                return await session.ReadTransactionAsync(async tx =>
                {
                    var cursor =
                        await tx.RunAsync(
                            "MATCH (drzava:Drzava) RETURN drzava;");

                    return await cursor.ToListAsync(record => new Drzava(record));
                });
            }
            finally
            {
                if (session != null)
                {
                    await session.CloseAsync();
                }
            }
        }

        [HttpDelete]
        private async void MatchDrzavaDel(string id)
        {
            var session = driver.Session();
            try
            {
                return await session.ReadTransactionAsync(async tx =>
                {
                    var cursor =
                        await tx.RunAsync(
                            "MATCH (drzava:Drzava) WHERE drzava.id = $id " +
                            "DETACH DELETE drzava",
                            new {id});
                });
            }
            finally
            {
                if (session != null)
                {
                    await session.CloseAsync();
                }
            }
        }
    }
}