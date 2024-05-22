using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Domain
{
    public class Destinacija
    {
        [JsonPropertyName("id")]
        public string id {get; set;}

        [JsonPropertyName("ime")]
        public string ime {get; set;}

        [JsonPropertyName("drzava")]
        public string drzava {get; set;}

        [JsonPropertyName("opis")]
        public string opis {get; set;}
        
        public string brStanovnika {get; set;}

        #nullable enable
        [JsonPropertyName("duzinaPlaze")]
        public string? duzinaPlaze {get; set;}
        #nullable disable

        [JsonPropertyName("imaMore")]
        public string imaMore {get; set;}

        [JsonPropertyName("listaSlika")]
        public List<string> listaSlika {get; set;} = new List<string>();
        
        public List<Hotel> hoteli {get; set;} = new List<Hotel>();

        public IDictionary<string, object> AsDictionary()
        {
            return new Dictionary<string, object>
            {
                { "ime", ime },
                { "drzava", drzava},
                { "opis", opis },
                { "duzinaPlaze", duzinaPlaze },
                { "imaMore", imaMore },
                { "listaSlika", listaSlika },
                { "hoteli", hoteli}
            };
        }
    }
}