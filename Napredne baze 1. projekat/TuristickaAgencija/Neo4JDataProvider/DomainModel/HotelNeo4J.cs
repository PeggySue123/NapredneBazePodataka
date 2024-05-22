using System;
using System.Collections.Generic;

namespace Neo4JDataProvider.DomainModel
{
    class HotelNeo4J
    {
        public string Id { get; set; }
        public string Ime { get; set; }
        public string Opis { get; set; }
        public string Destinacija { get; set; }
        public string Komentari { get; set; }
        public string Kodovi { get; set; }
        public List<string> ListaSlika { get; set; }
        public List<TuristickiVodicNeo4J> Vodici { get; set; }
        public TuristickiVodicNeo4J RadiUHotelu(HotelNeo4J hotel, String vodic)
        {
            return null;
        }
    }
}
