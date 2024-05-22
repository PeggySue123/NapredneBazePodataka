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
    public class Neo4jDestinacijaController
    {
        private readonly IDriver _driver;

        public Neo4jDestinacijaController()
        {
            _driver = GraphDatabase.Driver("bolt://localhost:7687", AuthTokens.Basic("neo4j", "ElTravel"));   
        }

        public IAsyncSession CreateAsyncSession()
        {
            return Driver.AsyncSession(o => o.WithDatabase("neo4j"));
        }

        [HttpPost]
        public async Task<IActionResult> CreateDestinacija(Destinacija destinacija)
        {
            var session = CreateAsyncSession();
            try
            {
                var query = @"
                    MERGE (destinacija:Destinacija { ime: $destinacija.ime })
                    SET destinacija.glavniGrad = $destinacija.glavniGrad,
                        destinacija.drzava = $destinacija.drzava,
                        destinacija.opis = $destinacija.opis,
                        destinacija.duzinaPlaze = $destinacija.duzinaPlaze,
                        destinacija.imaMore = $destinacija.imaMore,
                        destinacija.listaSlika = $destinacija.listaSlika,
                        destinacija.hotel = $destinacija.hotel
                    MERGE (drzava:Drzava { name: COALESCE($destinacija.drzava, 'N/A')})
                    MERGE (destinacija)-[:pripadaDrzavi]->(drzava)
                    MERGE (hotel: Hotel {name: COALESCE($destinacija.hoteli, 'N/A')})
                    MERGE (hotel)-[:pripadaDestinaciji]->(destinacija)
                ";
                foreach(Hotel hotel in drzava.hoteli){
                    var query1 = @"
                    Merge(hotel:Hotel { ime: COALESCE($hotel, 'N/A')})
                    Merge(hotel)-[:pripadaDestinaciji]->(destinacija)";
                    query += query1;
                }

                var parameters = new
                {
                    destinacija = destinacija.AsDictionary()
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
            var destinacija = await MatchDestinacija(id);
            if(destinacija == null)
            {
                return StatusCode(404);
            }

            return View("Index", destinacija);
        }
        
        private async Task<Destinacija> MatchDestinacija(string id)
        {
            var session = driver.Session();
            try
            {
                return await session.ReadTransactionAsync(async tx =>
                {
                    var cursor =
                        await tx.RunAsync(
                            "MATCH (destinacija:Destinacija) WHERE destinacija.id = $id " +
                            "OPTIONAL MATCH(destinacija)-[:imaHotele]->(hotel) " +
                            "RETURN destinacija, collect(hotel) AS hoteli",
                            new {id});

                    return new Destinacija(await cursor.SingleAsync());
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
            return View("Index", await MatchDestinacijas());
        }

        private async Task<IEnumerable<Hotel>> MatchDestinacijas()
        {
            var session = driver.Session();
            try
            {
                return await session.ReadTransactionAsync(async tx =>
                {
                    var cursor =
                        await tx.RunAsync(
                            "MATCH (destinacija:Destinacija) RETURN destinacija;");

                    return await cursor.ToListAsync(record => new Destinacija(record));
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
        private async void MatchDestinacijaDel(string id)
        {
            var session = driver.Session();
            try
            {
                return await session.ReadTransactionAsync(async tx =>
                {
                    var cursor =
                        await tx.RunAsync(
                            "MATCH (destinacija:Destinacija) WHERE destinacija.id = $id " +
                            "DETACH DELETE destinacija",
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