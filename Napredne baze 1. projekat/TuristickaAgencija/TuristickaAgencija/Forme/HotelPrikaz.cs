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
    public partial class HotelPrikaz : Form
    {
        public HotelPrikaz()
        {
            InitializeComponent();
        }

        private void HotelForma_Load(object sender, EventArgs e)
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
            string ime = lblImeHotela.Text;
            var query = new Neo4jClient.Cypher.CypherQuery("start n = node(*) where (n: Hotel) and has (n.ime) and n.ime =~{ime} return n",
                
                new Dictionary<string, object>(),
                CypherResultMode.Set);

            Hotel h = ((IRawGraphClient) client).ExecuteGetCypherResults<Hotel>(query);
            
            //OVDE TREBA DA SE PRIKAŽU INFO O HOTELU U TXTBOX-U
            MessageBox.Show(h.ime, h.opis, h.destinacija, h.komentari, h.listaSlika);
        }

        private void btnDeleteHotel_Click(object sender, EventArgs e)
        {
            //proveriti kako se dobija ime vodica iz onoga gde namestiš da se prikazuje
            string imeVodica = lblImeVodica.Text;
            string prezimeVodica = lblPrezimeVodica.Text;


            //videti jel može ovako
            Dictionary<string, object> queryDict = new Dictionary<string, object>();
            queryDict.Add("ime, prezime", (imeVodica, prezimeVodica));

            var query = new Neo4jClient.Cypher.CypherQuery("start n=node(*) where (n: TuristickiVodic) and exists (n.ime) and exists (n.prezime) and n.ime =~{imeVodica} and n.prezime =~{prezimeVodica} delete n",
                queryDict,
                CypherResultMode.Projection);

            List<TuristickiVodic> vodici = ((IRawGraphClient) client).ExecuteGetCypherResults<TuristickiVodic>(query).ToList();

            foreach( TuristickiVodic v in vodici)
            {
                //OVO JE DA SE IZLISTAJU PONOVO VODICI ISTO KO I U DRUGIM FORMAMA
                MessageBox.Show(v.ime, v.prezime);
            }
        }

        private void btnVodic_Click(object sender, EventArgs e)
        {
            TuristickiVodicPrikaz turistickiVodicPrikazForm = new TuristickiVodicPrikaz();
            turistickiVodicPrikazForm.client = client;
            turistickiVodicPrikazForm.ShowDialog();
        }
    }
}
