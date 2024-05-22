
namespace TuristickaAgencija.Forme
{
    partial class DrzavaPrikaz
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.lblDrzava = new System.Windows.Forms.Label();
            this.lblGlavniGrad = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.lblIzlazNaMore = new System.Windows.Forms.Label();
            this.textBox1 = new System.Windows.Forms.TextBox();
            this.listBox1 = new System.Windows.Forms.ListBox();
            this.btnDestinacija = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // lblDrzava
            // 
            this.lblDrzava.BackColor = System.Drawing.Color.Transparent;
            this.lblDrzava.Font = new System.Drawing.Font("Microsoft Sans Serif", 20F);
            this.lblDrzava.ForeColor = System.Drawing.Color.Red;
            this.lblDrzava.Location = new System.Drawing.Point(129, 9);
            this.lblDrzava.Name = "lblDrzava";
            this.lblDrzava.Size = new System.Drawing.Size(277, 66);
            this.lblDrzava.TabIndex = 0;
            this.lblDrzava.Text = "Drzava";
            this.lblDrzava.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // lblGlavniGrad
            // 
            this.lblGlavniGrad.Font = new System.Drawing.Font("Microsoft Sans Serif", 15F);
            this.lblGlavniGrad.Location = new System.Drawing.Point(12, 109);
            this.lblGlavniGrad.Name = "lblGlavniGrad";
            this.lblGlavniGrad.Size = new System.Drawing.Size(181, 33);
            this.lblGlavniGrad.TabIndex = 1;
            this.lblGlavniGrad.Text = "glavni grad";
            this.lblGlavniGrad.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // label3
            // 
            this.label3.Font = new System.Drawing.Font("Microsoft Sans Serif", 15F);
            this.label3.Location = new System.Drawing.Point(12, 174);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(181, 40);
            this.label3.TabIndex = 2;
            this.label3.Text = "sluzbeni jezik";
            this.label3.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // lblIzlazNaMore
            // 
            this.lblIzlazNaMore.Font = new System.Drawing.Font("Microsoft Sans Serif", 15F);
            this.lblIzlazNaMore.Location = new System.Drawing.Point(14, 243);
            this.lblIzlazNaMore.Name = "lblIzlazNaMore";
            this.lblIzlazNaMore.Size = new System.Drawing.Size(179, 33);
            this.lblIzlazNaMore.TabIndex = 3;
            this.lblIzlazNaMore.Text = "izlaz na more";
            this.lblIzlazNaMore.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // textBox1
            // 
            this.textBox1.BackColor = System.Drawing.Color.LightGray;
            this.textBox1.Font = new System.Drawing.Font("Microsoft Sans Serif", 9F);
            this.textBox1.Location = new System.Drawing.Point(19, 279);
            this.textBox1.Multiline = true;
            this.textBox1.Name = "textBox1";
            this.textBox1.Size = new System.Drawing.Size(174, 159);
            this.textBox1.TabIndex = 4;
            // 
            // listBox1
            // 
            this.listBox1.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.listBox1.FormattingEnabled = true;
            this.listBox1.Location = new System.Drawing.Point(264, 109);
            this.listBox1.Name = "listBox1";
            this.listBox1.Size = new System.Drawing.Size(271, 173);
            this.listBox1.TabIndex = 5;
            // 
            // btnDestinacija
            // 
            this.btnDestinacija.Font = new System.Drawing.Font("Microsoft Sans Serif", 10F);
            this.btnDestinacija.Location = new System.Drawing.Point(328, 342);
            this.btnDestinacija.Name = "btnDestinacija";
            this.btnDestinacija.Size = new System.Drawing.Size(164, 49);
            this.btnDestinacija.TabIndex = 6;
            this.btnDestinacija.Text = "Izaberi Destinaciju";
            this.btnDestinacija.UseVisualStyleBackColor = true;
            this.btnDestinacija.Click += new System.EventHandler(this.BtnDestinacija_Click);
            // 
            // DrzavaForma
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.LightGray;
            this.ClientSize = new System.Drawing.Size(553, 445);
            this.Controls.Add(this.btnDestinacija);
            this.Controls.Add(this.listBox1);
            this.Controls.Add(this.textBox1);
            this.Controls.Add(this.lblIzlazNaMore);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.lblGlavniGrad);
            this.Controls.Add(this.lblDrzava);
            this.Name = "DrzavaForma";
            this.Text = "Drzava";
            this.Load += new System.EventHandler(this.DrzavaForma_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label lblDrzava;
        private System.Windows.Forms.Label lblGlavniGrad;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label lblIzlazNaMore;
        private System.Windows.Forms.TextBox textBox1;
        private System.Windows.Forms.ListBox listBox1;
        private System.Windows.Forms.Button btnDestinacija;
    }
}