using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;

namespace Domain
{
    public class Hotel
    {
        [JsonPropertyName("id")]
        public string id {get; set;}

        [JsonPropertyName("ime")]
        public string ime {get; set;}

        [JsonPropertyName("opis")]        
        public string opis {get; set;}

        [JsonPropertyName("destinacija")]
        public string destinacija {get; set;}
        
        public string ocena {get; set;}
        
        public string zvezdice {get; set;}
        
#nullable enable
        public string? udaljenostOdPlaze {get; set;}
#nullable disable

        [JsonPropertyName("komentari")]
        public string komentari {get; set;}
        
        [JsonPropertyName("listaKodova")]
        public string listaKodova {get; set;}
        
        [JsonPropertyName("listaSlika")]
        public List<string> listaSlika {get; set;} = new List<string>();

        [JsonPropertyName("vodic")]
        public List<Vodic> vodic {get; set;} = new List<Vodic>();

        public IDictionary<string, object> AsDictionary()
        {
            return new Dictionary<string, object>
            {
                { "ime", ime },
                { "opis", opis },
                { "destinacija", destinacija},
                { "komentari", komentari },
                { "listaKodova", listaKodova },
                { "listaSlika", listaSlika },
                { "vodic", vodic}
            };
        }

    }
}
