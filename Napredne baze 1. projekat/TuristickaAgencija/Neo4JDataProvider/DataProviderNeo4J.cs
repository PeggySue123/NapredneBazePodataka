using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Neo4jClient;
using Neo4jClient.Cypher;
using Neo4JDataProvider.DomainModel;
using Newtonsoft.Json;

namespace Neo4JDataProvider
{
    class DataProviderNeo4J
    {
        private readonly GraphClient client;

        public DataProviderNeo4J()
        {
            client = new GraphClient(new Uri("bolt://localhost:7687"), "neo4j", "ElTravel");
            try
            {
                client.ConnectAsync();
            }
            catch (Exception)
            {
            }
        }

        #region Destinacija
        public DestinacijaNeo4J GetDestinacija(string ime)
        {
            DestinacijaNeo4J destinacija = new DestinacijaNeo4J();
            Dictionary<string, object> queryDict = new Dictionary<string, object>
            {
                { "ime", "'" + ime + "'" }
            };

            var query = new Neo4jClient.Cypher.CypherQuery("MATCH (n:Destinacija) WHERE n.ime={ime} RETURN n",
                                                            queryDict, CypherResultMode.Set, "neo4j");

            IEnumerable<DestinacijaNeo4J> destinacije = ((IRawGraphClient)client).ExecuteGetCypherResultsAsync<DestinacijaNeo4J>(query).Result;

            foreach(DestinacijaNeo4J destinacija1 in destinacije)
            {
                var query2 = new Neo4jClient.Cypher.CypherQuery("MATCH (n:Destinacija)-[r:PripadaDrzavi]->(b) WHERE n.ime={ime} RETURN b",
                                                                queryDict, CypherResultMode.Set, "neo4j");

                IEnumerable<DrzavaNeo4J> drzave = ((IRawGraphClient)client).ExecuteGetCypherResultsAsync<DrzavaNeo4J>(query2).Result;

                foreach(DrzavaNeo4J drzava in drzave)
                {
                    destinacija1.Drzava = drzava.Ime;
                }

                var query3 = new Neo4jClient.Cypher.CypherQuery("MATCH (n:Destinacija)-[r:imaHotel]->(b) WHERE n.ime={ime} RETURN b",
                                                                queryDict, CypherResultMode.Set, "neo4j");

                IEnumerable<HotelNeo4J> hoteli = ((IRawGraphClient)client).ExecuteGetCypherResultsAsync<HotelNeo4J>(query3).Result;

                foreach (HotelNeo4J hotel in hoteli)
                {
                    destinacija1.Hoteli.Add(hotel);
                }

                destinacija = destinacija1;
            }
            return destinacija;
        }

        public List<DestinacijaNeo4J> GetDestinacijas()
        {
            List<DestinacijaNeo4J> destinacijas = new List<DestinacijaNeo4J>();
            Dictionary<string, object> queryDict = new Dictionary<string, object>();

            var query = new Neo4jClient.Cypher.CypherQuery("MATCH (n:Destinacija) RETURN n",
                                                            queryDict, CypherResultMode.Set, "neo4j");

            IEnumerable<DestinacijaNeo4J> destinacije = ((IRawGraphClient)client).ExecuteGetCypherResultsAsync<DestinacijaNeo4J>(query).Result;

            foreach (DestinacijaNeo4J destinacija in destinacije)
            {
                Dictionary<string, object> queryDict2 = new Dictionary<string, object>
                {
                    { "ime", "'" + destinacija.Ime + "'" }
                };

                var query2 = new Neo4jClient.Cypher.CypherQuery("MATCH (n:Destinacija)-[r:PripadaDrzavi]->(b) WHERE n.ime={ime} RETURN b",
                                                                queryDict2, CypherResultMode.Set, "neo4j");

                IEnumerable<DrzavaNeo4J> drzave = ((IRawGraphClient)client).ExecuteGetCypherResultsAsync<DrzavaNeo4J>(query2).Result;

                foreach (DrzavaNeo4J drzava in drzave)
                {
                    destinacija.Drzava = drzava.Ime;
                }

                var query3 = new Neo4jClient.Cypher.CypherQuery("MATCH (n:Destinacija)-[r:imaHotel]->(b) WHERE n.ime={ime} RETURN b",
                                                                queryDict2, CypherResultMode.Set, "neo4j");

                IEnumerable<HotelNeo4J> hoteli = ((IRawGraphClient)client).ExecuteGetCypherResultsAsync<HotelNeo4J>(query3).Result;

                foreach (HotelNeo4J hotel in hoteli)
                {
                    destinacija.Hoteli.Add(hotel);
                }

                destinacijas.Add(destinacija);
            }
            return destinacijas;
        }

        public void AddDestinacija(DestinacijaNeo4J destinacija)
        {
            Dictionary<string, object> queryDict = new Dictionary<string, object>
            {
                {"ime", "'" + destinacija.Ime + "'" },
                {"opis", "'" + destinacija.Opis + "'" },
                {"duzinaPlaze", "'" + destinacija.DuzinaPlaze + "'" },
                {"imaMore", "'" + destinacija.ImaMore + "'" },
                {"listaSlika", "'" + destinacija.ListaSlika + "'" }
            };
            if (destinacija.ImaMore == "Da")
            {
                var query = new Neo4jClient.Cypher.CypherQuery("MERGE (n:Destinacija{ime:'" + destinacija.Ime + ", opis: '" + destinacija.Opis + ", duzinaPlaze:'" +
                    destinacija.DuzinaPlaze + "', imaMore:'" + destinacija.ImaMore + "', listaSlika:" + destinacija.ListaSlika + "}) RETURN n",
                                                            queryDict, CypherResultMode.Set, "neo4j");
                _ = ((IRawGraphClient)client).ExecuteGetCypherResultsAsync<DestinacijaNeo4J>(query).Result;
            }
            else
            {
                var query = new Neo4jClient.Cypher.CypherQuery("MERGE (n:Destinacija{ime:'" + destinacija.Ime + ", opis: '" + destinacija.Opis + 
                    "', imaMore:'" + destinacija.ImaMore + "', listaSlika:" + destinacija.ListaSlika + "}) RETURN n",
                                                            queryDict, CypherResultMode.Set, "neo4j");
                _ = ((IRawGraphClient)client).ExecuteGetCypherResultsAsync<DestinacijaNeo4J>(query).Result;
            }
            var query2 = new Neo4jClient.Cypher.CypherQuery("MATCH(n:Destinacija), (b:Drzava) WHERE n.ime='" + destinacija.Ime + "' AND b.ime='" + destinacija.Drzava + 
                "' CREATE (n)-[r:pripadaDrzavi]->(b) RETURN n", queryDict, CypherResultMode.Set, "neo4j");
            _ = ((IRawGraphClient)client).ExecuteGetCypherResultsAsync<DestinacijaNeo4J>(query2).Result;
            query2 = new Neo4jClient.Cypher.CypherQuery("MATCH(n:Destinacija), (b:Drzava) WHERE n.ime='" + destinacija.Ime + "' AND b.ime='" + destinacija.Drzava +
                "' CREATE (b)-[r:imaGrad]->(n) RETURN n", queryDict, CypherResultMode.Set, "neo4j");
            _ = ((IRawGraphClient)client).ExecuteGetCypherResultsAsync<DestinacijaNeo4J>(query2).Result;
            foreach (HotelNeo4J hotel in destinacija.Hoteli)
            {
                var query = new Neo4jClient.Cypher.CypherQuery("MATCH(n:Destinacija), (b:Hotel) WHERE n.ime='" + destinacija.Ime + "' AND b.ime='" + hotel.Ime +
                "' CREATE (n)-[r:imaHotel]->(b) RETURN n", queryDict, CypherResultMode.Set, "neo4j");
                _ = ((IRawGraphClient)client).ExecuteGetCypherResultsAsync<DestinacijaNeo4J>(query).Result;
                query = new Neo4jClient.Cypher.CypherQuery("MATCH(n:Destinacija), (b:Hotel) WHERE n.ime='" + destinacija.Ime + "' AND b.ime='" + hotel.Ime +
                "' CREATE (b)-[r:pripadaDestinaciji]->(n) RETURN n", queryDict, CypherResultMode.Set, "neo4j");
                _ = ((IRawGraphClient)client).ExecuteGetCypherResultsAsync<DestinacijaNeo4J>(query).Result;
            }
        }

        public void DeleteDestinacija(string ime)
        {
            Dictionary<string, object> queryDict = new Dictionary<string, object>
            {
                {"ime", "'" + ime + "'" }
            };

            var query = new Neo4jClient.Cypher.CypherQuery("MATCH (n:Destinacija) WHERE n.ime={ime} DETACH DELETE n",
                                                            queryDict, CypherResultMode.Set, "neo4j");
            _ = ((IRawGraphClient)client).ExecuteGetCypherResultsAsync<DestinacijaNeo4J>(query).Result;
        }
        #endregion

        #region Drzava
        public DrzavaNeo4J GetDrzava(string ime)
        {
            DrzavaNeo4J drzava = new DrzavaNeo4J();
            Dictionary<string, object> queryDict = new Dictionary<string, object>
            {
                { "ime", "'" + ime + "'" }
            };

            var query = new Neo4jClient.Cypher.CypherQuery("MATCH (n:Drzava) WHERE n.ime={ime} RETURN n",
                                                            queryDict, CypherResultMode.Set, "neo4j");

            IEnumerable<DrzavaNeo4J> drzave = ((IRawGraphClient)client).ExecuteGetCypherResultsAsync<DrzavaNeo4J>(query).Result;

            foreach (DrzavaNeo4J drzava1 in drzave)
            {
                var query2 = new Neo4jClient.Cypher.CypherQuery("MATCH (n:Drzava)-[r:imaGrad]->(b) WHERE n.ime={ime} RETURN b",
                                                                queryDict, CypherResultMode.Set, "neo4j");

                IEnumerable<DestinacijaNeo4J> destinacije = ((IRawGraphClient)client).ExecuteGetCypherResultsAsync<DestinacijaNeo4J>(query2).Result;

                foreach (DestinacijaNeo4J destinacija in destinacije)
                {
                    drzava1.Destinacije.Add(destinacija);
                }

                drzava = drzava1;
            }
            return drzava;
        }

        public List<DrzavaNeo4J> GetDrzavas()
        {
            List<DrzavaNeo4J> drzavas = new List<DrzavaNeo4J>();
            Dictionary<string, object> queryDict = new Dictionary<string, object>();

            var query = new Neo4jClient.Cypher.CypherQuery("MATCH (n:Drzava) RETURN n",
                                                            queryDict, CypherResultMode.Set, "neo4j");

            IEnumerable<DrzavaNeo4J> drzave = ((IRawGraphClient)client).ExecuteGetCypherResultsAsync<DrzavaNeo4J>(query).Result;

            foreach (DrzavaNeo4J drzava in drzave)
            {
                Dictionary<string, object> queryDict2 = new Dictionary<string, object>
                {
                    { "ime", "'" + drzava.Ime + "'" }
                };

                var query2 = new Neo4jClient.Cypher.CypherQuery("MATCH (n:Drzava)-[r:imaGrad]->(b) WHERE n.ime={ime} RETURN b",
                                                                queryDict2, CypherResultMode.Set, "neo4j");

                IEnumerable<DestinacijaNeo4J> destinacije = ((IRawGraphClient)client).ExecuteGetCypherResultsAsync<DestinacijaNeo4J>(query2).Result;

                foreach (DestinacijaNeo4J destinacija in destinacije)
                {
                    drzava.Destinacije.Add(destinacija);
                }

                drzavas.Add(drzava);
            }
            return drzavas;
        }

        public void AddDrzava(DrzavaNeo4J drzava)
        {
            Dictionary<string, object> queryDict = new Dictionary<string, object>
            {
                {"ime", "'" + drzava.Ime + "'" },
                {"opis", "'" + drzava.Opis + "'" },
                {"glavniGrad", "'" + drzava.GlavniGrad + "'" },
                {"sluzbeniJezik", "'" + drzava.SluzbeniJezik + "'" }
            };
            var query = new Neo4jClient.Cypher.CypherQuery("MERGE (n:Destinacija{ime:'" + drzava.Ime + ", opis: '" + drzava.Opis + ", glavniGrad:'" +
                    drzava.GlavniGrad + "', sluzbeniJezik:'" + drzava.SluzbeniJezik + "'}) RETURN n", queryDict, CypherResultMode.Set, "neo4j");
            _ = ((IRawGraphClient)client).ExecuteGetCypherResultsAsync<DestinacijaNeo4J>(query).Result;
            foreach (DestinacijaNeo4J destinacija in drzava.Destinacije)
            {
                var query2 = new Neo4jClient.Cypher.CypherQuery("MATCH(n:Drzava), (b:Destinacija) WHERE n.ime='" + drzava.Ime + "' AND b.ime='" + destinacija.Ime +
                "' CREATE (n)-[r:imaGrad]->(b) RETURN n", queryDict, CypherResultMode.Set, "neo4j");
                _ = ((IRawGraphClient)client).ExecuteGetCypherResultsAsync<DestinacijaNeo4J>(query2).Result;
                query2 = new Neo4jClient.Cypher.CypherQuery("MATCH(n:Drzava), (b:Destinacija) WHERE n.ime='" + drzava.Ime + "' AND b.ime='" + destinacija.Ime +
                "' CREATE (b)-[r:pripadaDrzavi]->(n) RETURN n", queryDict, CypherResultMode.Set, "neo4j");
                _ = ((IRawGraphClient)client).ExecuteGetCypherResultsAsync<DestinacijaNeo4J>(query2).Result;
            }
        }

        public void DeleteDrzava(string ime)
        {
            Dictionary<string, object> queryDict = new Dictionary<string, object>
            {
                {"ime", "'" + ime + "'" }
            };

            var query = new Neo4jClient.Cypher.CypherQuery("MATCH (n:Drzava) WHERE n.ime={ime} DETACH DELETE n",
                                                            queryDict, CypherResultMode.Set, "neo4j");
            _ = ((IRawGraphClient)client).ExecuteGetCypherResultsAsync<DestinacijaNeo4J>(query).Result;
        }
        #endregion

        #region Hotel
        #endregion

        #region TuristickaAgencija
        #endregion

        #region TuristickiVodic
        #endregion
    }
}
