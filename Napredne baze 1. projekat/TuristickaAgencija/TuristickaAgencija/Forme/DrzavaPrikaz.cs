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
    public partial class DrzavaPrikaz : Form
    {
        public DrzavaPrikaz()
        {
            InitializeComponent();
        }

        private void DrzavaForma_Load(object sender, EventArgs e)
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

            string ime = lblImeDrzave.Text;

            var query = new Neo4jClient.Cypher.CypherQuery("start n = node(*) where (n: Drzava) and has (n.ime) and n.ime=~{ime} return n",
                
                new Dictionary<string, object>(),
                CypherResultMode.Set);

            Drzava d = ((IRawGraphClient) client).ExecuteGetCypherResult<Drzava>(query);
            
            //OVDE TREBA DA SE PRIKAŽU INFO O DRŽAVI U TXTBOX-U
            MessageBox.Show(d.Ime, d.Opis, d.GlavniGrad, d.SluzbeniJezik, d.Destinacije);
        }

        private void BtnDestinacija_Click(object sender, EventArgs e)
        {
            DestinacijaPrikaz destinacijaPrikazForm = new DestinacijaPrikaz();
            destinacijaPrikazForm.client = client;
            destinacijaPrikazForm.ShowDialog();
        }


        private void btnDeleteDestinacija_Click(object sender, EventArgs e)
        {
            //proveri kako se uzima ime, pretpostavljam da nije labela nego ako se prikazuje u listBox-u ili negde već onda odatle
            string imeDestinacije = lblImeDestinacije.Text;

            Dictionary<string, object> queryDict = new Dictionary<string, object>();
            queryDict.Add("ime", imeDestinacije);

            var query = new Neo4jClient.Cypher.CypherQuery("start n=node(*) where (n: Destinacija) and exists (n.ime) and n.ime =~{imeDestinacije} delete n",
                queryDict,
                CypherResultMode.Projection);

            List<Destinacija> destinacije = ((IRawGraphClient) client).ExecuteGetCypherResults<Destinacija>(query).ToList();

            foreach( Destinacija d in destinacije)
            {
                //OVO JE DA SE IZLISTAJU PONOVO SVE DESTINACIJE, KAO U DEST ZA HOTELE, ZAVISI GDE SE I KAKO PRIKAZUJU
                MessageBox.Show(d.ime);
            }
        }
    }
}
