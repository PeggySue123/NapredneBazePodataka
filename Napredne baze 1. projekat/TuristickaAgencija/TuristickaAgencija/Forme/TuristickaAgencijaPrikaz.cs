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
    public partial class TuristickaAgencijaPrikaz : Form
    {
        public TuristickaAgencijaPrikaz()
        {
            InitializeComponent();
        }
        private void TuristickaAgencijaForma_Load(object sender, EventArgs e)
        {
            
        }

        private void BtnIzaberiDrzavu_Click(object sender, EventArgs e)
        {
            DrzavaPrikaz drzavaPrikazForm = new DrzavaPrikaz();
            drzavaPrikazForm.client = client;
            drzavaPrikazForm.ShowDialog();
        }
    }
}
