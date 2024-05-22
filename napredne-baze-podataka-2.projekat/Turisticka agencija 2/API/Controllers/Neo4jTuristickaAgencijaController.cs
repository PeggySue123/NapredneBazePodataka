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
    public class  Neo4jTuristickaAgencijaController: ControllerBase
    {
        private readonly IDriver _driver;

        public Neo4jTuristickaAgencijaController()
        {
            _driver = GraphDatabase.Driver("bolt://localhost:7687", AuthTokens.Basic("neo4j", "ElTravel"));   
        }

        public IAsyncSession CreateAsyncSession()
        {
            return Driver.AsyncSession(o => o.WithDatabase("neo4j"));
        }

        [HttpPost]
        public async Task<IActionResult> CreateTuristickaAgencija(TuristickaAgencija agencija)
        {
            var session = CreateAsyncSession();
            try
            {
                var query = @"
                    MERGE (agencija:TuristickaAgencija { ime: $agencija.ime })
                    SET agencija.vlasnika = $agencija.vlasnika,
                        agencija.opis = $agencija.opis,
                        agencija.sediste = $agencija.sediste,
                        agencija.radnoVreme = $agencija.radnoVreme,
                        agencija.listaFilijala = $agencija.listaFilijala,
                        agencija.kontaktTel = $agencija.kontaktTel,
                        agencija.cekovi = $agencija.cekovi,
                        agencija.rate = $agencija.rate,
                        agencija.drzave = $agencija.drzave,
                        agencija.slike = $agencija.slike
                    MERGE (drzave:Drzava { name: COALESCE($agencija.drzave, 'N/A')})
                    MERGE (agencija)-[:nudiDrzave]->(drzava)
                ";
                foreach(Drzava drzava in hotel.drzave){
                    var query1 = @"
                    Merge(drzava:Drzava { ime: COALESCE($drzava, 'N/A')})
                    Merge(agencija)-[:nudiDrzave]->(drzava)";
                    query += query1;
                }

                var parameters = new
                {
                    agencija = agencija.AsDictionary()
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
        public async Task<IActionResult> Index(string id)
        {
            var agencija = await MatchAgencija(id);
            if(agencija == null)
            {
                return StatusCode(404);
            }

            return View("Index", agencija);
        }

        private async Task<TuristickaAgencija> MatchAgencija(string id)
        {
            var session = driver.Session();
            try
            {
                return await session.ReadTransactionAsync(async tx =>
                {
                    var cursor =
                        await tx.RunAsync(
                            "MATCH (agencija:TuristickaAgencija) WHERE agencija.id = $id " +
                            "OPTIONAL MATCH(agencija)-[:nudiDrzave]->(drzava) " +
                            "RETURN agencija, collect(drzava) AS drzave",
                            new {id});

                    return new TuristickaAgencija(await cursor.SingleAsync());
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
            return View("Index", await MatchAgencijas());
        }

        private async Task<IEnumerable<TuristickaAgencija>> MatchAgencijas()
        {
            var session = driver.Session();
            try
            {
                return await session.ReadTransactionAsync(async tx =>
                {
                    var cursor =
                        await tx.RunAsync(
                            "MATCH (agencija:TuristickaAgencija) RETURN agencija;");

                    return await cursor.ToListAsync(record => new TuristickaAgencija(record));
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
        private async void MatchAgencijaDel(string id)
        {
            var session = driver.Session();
            try
            {
                return await session.ReadTransactionAsync(async tx =>
                {
                    var cursor =
                        await tx.RunAsync(
                            "MATCH (agencija:TuristickaAgencija) WHERE agencija.id = $id " +
                            "DETACH DELETE agencija",
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