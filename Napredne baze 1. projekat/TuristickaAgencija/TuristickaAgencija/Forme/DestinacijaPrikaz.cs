using System.Windows.Forms;

namespace TuristickaAgencija.Forme
{
    public partial class DestinacijaPrikaz : Form
    {
        public DestinacijaPrikaz()
        {
            InitializeComponent();
        }

        public void DestinacijaForma_Load()
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

            string ime = lblImeDestinacije.Text;

            var query = new Neo4jClient.Cypher.CypherQuery("start n = node(*) where (n: Destinacija) and has (n.ime) and n.ime=~{ime} return n",
                
                new Dictionary<string, object>(),
                CypherResultMode.Set);

            Destinacija d = ((IRawGraphClient) client).ExecuteGetCypherResult<Destinacija>(query);
            
            //OVDE TREBA DA SE PRIKAŽU INFO O DESTINACIJI U TXTBOX-U
            MessageBox.Show(d.Ime, d.Opis, d.Drzava, d.DuzinaPlaze, d.ListaSlika, d.Hoteli);
        }

        private void btnDeleteHotel_Click(object sender, EventArgs e)
        {
            string imeHotela = lblImeHotela.Text;

            Dictionary<string, object> queryDict = new Dictionary<string, object>();
            queryDict.Add("ime", imeHotela);

            var query = new Neo4jClient.Cypher.CypherQuery("start n=node(*) where (n: Hotel) and exists (n.ime) and n.ime =~{imeHotela} delete n",
                queryDict,
                CypherResultMode.Projection);

            List<Hotel> hoteli = ((IRawGraphClient) client).ExecuteGetCypherResults<Hotel>(query).ToList();

            foreach( Hotel h in hoteli)
            {
                //OVO JE DA SE IZLISTAJU PONOVO HOTELI SVI U TXTBOX-U ALI NE ZNAM KAKO SE ZOVE TAJ TXTBOX NITI DA LI JE U OVOJ FORMI, POŠTO NMG DA OTVORIM FORMU, NAĐI OVO MOLIM TE :D
                MessageBox.Show(h.ime);
            }
        }
    }
}
