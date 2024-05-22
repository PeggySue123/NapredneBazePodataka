using System;
using System.Collections.Generic;

namespace Neo4JDataProvider.DomainModel
{
    class TuristickaAgencijaNeo4J
    {
        public string Id { get; set; }
        public string Ime { get; set; }
        public string Vlasnik { get; set; }
        public string Opis { get; set; }
        public string Sediste { get; set; }
        public string RadnoVreme { get; set; }
        public string ListaFilijala { get; set; }
        public string KontaktTel { get; set; }
        public string Cekovi { get; set; }
        public string Rate { get; set; }
        public List<string> ListaSlika { get; set; }
        public List<DrzavaNeo4J> Drzave { get; set; }
        public DrzavaNeo4J UAgenciji(TuristickaAgencijaNeo4J agencija, String drzava)
        {
            return null;
        }
    }
}
