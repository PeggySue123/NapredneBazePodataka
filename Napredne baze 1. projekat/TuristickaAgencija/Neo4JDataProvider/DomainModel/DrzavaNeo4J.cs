using System;
using System.Collections.Generic;

namespace Neo4JDataProvider.DomainModel
{
    class DrzavaNeo4J
    {
        public string Id { get; set; }
        public string Ime { get; set; }
        public string GlavniGrad { get; set; }
        public string SluzbeniJezik { get; set; }
        public string Opis { get; set; }
        public List<DestinacijaNeo4J> Destinacije { get; set; }
        public DestinacijaNeo4J DeoDrzave(DrzavaNeo4J drzava, String destinacija)
        {
            return null;
        }
    }
}
