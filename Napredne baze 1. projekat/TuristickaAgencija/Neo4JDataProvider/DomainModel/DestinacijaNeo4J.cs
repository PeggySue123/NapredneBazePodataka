using System;
using System.Collections.Generic;

namespace Neo4JDataProvider.DomainModel
{
    class DestinacijaNeo4J
    {
        public string Id { get; set; }
        public string Ime { get; set; }
        public string Drzava { get; set; }
        public string Opis { get; set; }
        public string DuzinaPlaze { get; set; }
        public string ImaMore { get; set; }
        public List<string> ListaSlika { get; set; }
        public List<HotelNeo4J> Hoteli { get; set; }
        public HotelNeo4J NaDestinaciji(DestinacijaNeo4J destinacija, String hotel)
        {
            return null;
        }
    }
}
