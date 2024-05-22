using Domain;
using System.Collections.Generic;
using System.Threading.Tasks;
using Neo4j.Driver;
using Neo4j_Repository.DomainModel;
using Neo4jClient;
using Neo4jClien.Cypher;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Neo4jVodicController
    {
        private readonly IDriver _driver;

        public Neo4jVodicController()
        {
            _driver = GraphDatabase.Driver("bolt://localhost:7687", AuthTokens.Basic("neo4j", "ElTravel"));   
        }

        public IAsyncSession CreateAsyncSession()
        {
            return Driver.AsyncSession(o => o.WithDatabase("neo4j"));
        }

        [HttpPost]
        public async Task<IActionResult> CreateVodic(Vodic vodic)
        {
            var session = CreateAsyncSession();
            try
            {
                var query = @"
                    MERGE (vodic:Vodic { ime: $vodic.ime, prezime: $vodic.prezime })
                    SET vodic.jezici = $vodic.jezici,
                        vodic.uTurizmu = $vodic.uTurizmu
                ";

                var parameters = new
                {
                    vodic = vodic.AsDictionary()
                };

                await session.RunAndConsumeAsync(query, parameters);
            }
            finally
            {
                await session.CloseAsync();
            }

        }

        [Route("{id}")]
        public async Task<IActionResult> Index(string ime, string prezime)
        {
            var vodic = await MatchVodic(ime, prezime);
            if(vodic == null)
            {
                return StatusCode(404);
            }

            return View("Index", vodic);
        }
        
        private async Task<Vodic> MatchVodic(string ime, string prezime)
        {
            var session = driver.Session();
            try
            {
                return await session.ReadTransactionAsync(async tx =>
                {
                    var cursor =
                        await tx.RunAsync(
                            "MATCH (vodic:Vodic) WHERE vodic.ime = $ime" +
                            "MATCH (vodic:Vodic) WHERE vodic.prezime = $prezime",
                            new {ime, prezime});

                    return new Vodic(await cursor.SingleAsync());
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
            return View("Index", await MatchVodics());
        }

        private async Task<IEnumerable<Hotel>> MatchVodics()
        {
            var session = driver.Session();
            try
            {
                return await session.ReadTransactionAsync(async tx =>
                {
                    var cursor =
                        await tx.RunAsync(
                            "MATCH (vodic:Vodic) RETURN vodic;");

                    return await cursor.ToListAsync(record => new Vodic(record));
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
        private async void MatchVodicDel(string ime, string prezime)
        {
            var session = driver.Session();
            try
            {
                return await session.ReadTransactionAsync(async tx =>
                {
                    var cursor =
                        await tx.RunAsync(
                            "MATCH (vodic:Vodic) WHERE vodic.ime = $id " +
                            "MATCH (vodic:Vodic) WHERE vodic.prezime = $id " +
                            "DETACH DELETE vodic",
                            new {ime, prezime});
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