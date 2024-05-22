using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace TuristickaAgencija.Forme
{
    public partial class TuristickiVodicPrikaz : Form
    {
        public TuristickiVodicPrikaz()
        {
            InitializeComponent();
        }

        public void TuristickiVodicForma_Load()
        {
            client = new GraphClient(new Uri("http://localhost:7474/db/data"), "neo4j", "ElTravel");
            try
            {
                client.Connect();
            }
            catch(Exception exc)
            {
                MessageBox.Show(exc.Message);
            }

            //ovo će da se uzima iz labela u kojima će i da se prikazuje, ali treba da se vidi kako to beše
            string ime = lblImeVodica.Text;
            string prezime = lblPrezimeVodica.Text;
            var query = new Neo4jClient.Cypher.CypherQuery("start n = node(*) where (n: TuristickiVodic) and has (n.ime) and has (n.prezime) and n.ime =~{ime} and n.prezime =~{prezime} return n",
                
                new Dictionary<string, object>(),
                CypherResultMode.Set);

            TuristickiVodic v = ((IRawGraphClient) client).ExecuteGetCypherResults<TuristickiVodic>(query);
            
            //OVDE TREBA DA SE PRIKAŽU INFO O VODICU U TXTBOX-U
            MessageBox.Show(v.Ime, v.Prezime, v.Jezici, v.UTurizmu);
        }
        }
    }
}
