using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;

namespace Domain
{
    public class TuristickaAgencija
    {
        [JsonPropertyName("id")]
        public string id {get; set;}
        
        [JsonPropertyName("ime")]
        public string ime {get; set;}
        
        [JsonPropertyName("vlasnik")]
        public string vlasnik {get; set;}
        
        [JsonPropertyName("opis")]
        public string opis {get; set;}
        
        [JsonPropertyName("sediste")]
        public string sediste {get; set;}
        
        [JsonPropertyName("radnoVreme")]
        public string radnoVreme {get; set;}
        
        [JsonPropertyName("listaFilijala")]
        public string listaFilijala {get; set;}
        
        [JsonPropertyName("kontaktTel")]
        public string kontaktTel {get; set;}
        
        [JsonPropertyName("cekovi")]
        public string cekovi {get; set;}
        
        [JsonPropertyName("rate")]
        public string rate {get; set;}
        
        [JsonPropertyName("drzave")]
        public List<Drzava> drzave {get; set;} = new List<Drzava>();
        
        [JsonPropertyName("listaSlika")]
        public List<string> slike {get; set;} = new List<string>();

        public IDictionary<string, object> AsDictionary()
        {
            return new Dictionary<string, object>
            {
                { "ime", ime },
                { "vlasnik", vlasnik},
                { "opis", opis },
                { "sediste", sediste },
                { "radnoVreme", radnoVreme },
                { "listaFilijala", listaFilijala },
                { "kontaktTel", kontaktTel },
                { "cekovi", cekovi },
                { "rate", rate },
                { "drzave", drzave},
                { "listaSlika", slike}
            };
        }

    }
}