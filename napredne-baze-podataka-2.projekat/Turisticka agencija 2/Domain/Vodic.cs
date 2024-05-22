using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Text;

namespace Domain
{
    public class Vodic
    {
        [JsonPropertyName("id")]
        public string id {get; set;}
        
        [JsonPropertyName("ime")]
        public string ime {get; set;}
        
        [JsonPropertyName("prezime")]
        public string prezime {get; set;}
        
        [JsonPropertyName("govori")]
        public string jezici {get; set;}
        
        [JsonPropertyName("uTurizmu")]
        public string uTurizmu {get; set;}
        
        public string godineNaDestinaciji {get; set;}

        public IDictionary<string, object> AsDictionary()
        {
            return new Dictionary<string, object>
            {
                { "ime", ime },
                { "prezime", prezime },
                { "jezici", jezici },
                { "uTurizmu", uTurizmu}
            };
        }

    }
}