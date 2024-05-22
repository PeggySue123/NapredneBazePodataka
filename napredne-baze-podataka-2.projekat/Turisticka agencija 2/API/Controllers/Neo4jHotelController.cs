using Domain;
using System.Collections.Generic;
using System.Threading.Tasks;
using Neo4j.Driver;
using Neo4j_Repository.DomainModel;
using Neo4jClient;
using Neo4jClient.Cypher;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class  Neo4jHotelController: ControllerBase
    {
        private readonly IDriver _driver;

        public Neo4jHotelController()
        {
            _driver = GraphDatabase.Driver("bolt://localhost:7687", AuthTokens.Basic("neo4j", "ElTravel"));   
        }

        public IAsyncSession CreateAsyncSession()
        {
            return Driver.AsyncSession(o => o.WithDatabase("neo4j"));
        }

        [HttpPost]
        public async Task<IActionResult> CreateHotel(Hotel hotel)
        {
            var session = CreateAsyncSession();
            try
            {
                var query = @"
                    MERGE (hotel:Hotel { ime: $hotel.ime })
                    SET hotel.opis = $hotel.opis,
                        hotel.komentari = $hotel.komentari,
                        hotel.listaKodova = $hotel.listaKodova,
                        hotel.listaSlika = $hotel.listaSlika
                    MERGE (destinacija:Destinacija { name: COALESCE($hotel.destinacija, 'N/A')})
                    MERGE (hotel)-[:pripadaDestinaciji]->(destinacija)
                ";
                foreach(Vodic vodic in hotel.vodici){
                    var query1 = @"
                    Merge(vodic:Vodic { ime: COALESCE($vodic, 'N/A')})
                    Merge(hotel)-[:imaVodica]->(vodic)";
                    query += query1;
                }

                var parameters = new
                {
                    hotel = hotel.AsDictionary()
                };

                await session.RunAndConsumeAsync(query, parameters);
            }
            finally
            {
                await session.CloseAsync();
            }



            /*var statementText = new StringBuilder();
            statementText.Append("MERGE (hotel:Hotel {ime: $ime, opis: $opis, komentari: $komentari, kodovi: $kodovi})");
            var statementParameters = new Dictionary<string, object>
            {
                {"name", name}
            };

            var session = this._driver.AsyncSession();
            var result = await session.WriteTransactionAsync(tx => tx.RunAsync(statementText.ToString(),  statementParameters));
            return StatusCode(201, "Node has been created in the database");*/
        }

        [Route("{id}")]
        public async Task<IActionResult> IndexId(string id)
        {
            var hotel = await MatchHotel(id);
            if(hotel == null)
            {
                return StatusCode(404);
            }

            return View("Index", hotel);
        }

        private async Task<Hotel> MatchHotel(string id)
        {
            var session = driver.Session();
            try
            {
                return await session.ReadTransactionAsync(async tx =>
                {
                    var cursor =
                        await tx.RunAsync(
                            "MATCH (hotel:Hotel) WHERE hotel.id = $id " +
                            "OPTIONAL MATCH(hotel)-[:imaVodice]->(vodic) " +
                            "OPTIONAL MATCH(hotel)-[:pripadaDestinaciji]->(destinacija) " +
                            "RETURN hotel, collect(vodic) AS vodici,  collect(destinacija) AS destinacije",
                            new {id});

                    return new Hotel(await cursor.SingleAsync());
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
            return View("Index", await MatchHotels());
        }

        private async Task<IEnumerable<Hotel>> MatchHotels()
        {
            var session = driver.Session();
            try
            {
                return await session.ReadTransactionAsync(async tx =>
                {
                    var cursor =
                        await tx.RunAsync(
                            "MATCH (hotel:Hotel) RETURN hotel;");

                    return await cursor.ToListAsync(record => new Hotel(record));
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
        private async void MatchHotelDel(string id)
        {
            var session = driver.Session();
            try
            {
                return await session.ReadTransactionAsync(async tx =>
                {
                    var cursor =
                        await tx.RunAsync(
                            "MATCH (hotel:Hotel) WHERE hotel.id = $id " +
                            "DETACH DELETE hotel",
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