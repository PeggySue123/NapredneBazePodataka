using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Domain
{
    public class Drzava
    {   
        [JsonPropertyName("id")]
        public string id {get; set;}

        [JsonPropertyName("ime")]
        public string ime {get; set;}
        
        [JsonPropertyName("glavniGrad")]
        public string glavniGrad {get; set;}
        
        [JsonPropertyName("sluzbeniJezik")]
        public string sluzbeniJezik {get; set;}
        
        [JsonPropertyName("opis")]
        public string opis {get; set;}

        public string izlazNaMore {get; set;}
        
        public List<Destinacija> gradovi {get; set;} = new List<Destinacija>();

        public IDictionary<string, object> AsDictionary()
        {
            return new Dictionary<string, object>
            {
                { "ime", ime },
                { "glavniGrad", glavniGrad },
                { "sluzbeniJezik", sluzbeniJezik },
                { "opis", opis },
                { "gradovi", gradovi}
            };
        }
    }
}