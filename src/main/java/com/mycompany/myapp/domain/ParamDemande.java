package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A ParamDemande.
 */
@Entity
@Table(name = "param_demande")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ParamDemande implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_demande")
    private String idDemande;

    @Column(name = "fgcle")
    private Long fgcle;

    @Column(name = "nom_data_loader")
    private Long nomDataLoader;

    @Column(name = "version_data_loader")
    private String versionDataLoader;

    @Column(name = "nom_modele")
    private Long nomModele;

    @Column(name = "id_modele")
    private Long idModele;

    @Column(name = "version_modele")
    private String versionModele;

    @Column(name = "impression")
    private String impression;

    @Column(name = "archivage")
    private String archivage;

    @Column(name = "interactive")
    private String interactive;

    @Column(name = "stockage")
    private String stockage;

    @Column(name = "host_col")
    private String hostCol;

    @Column(name = "imp_centr")
    private String impCentr;

    @Column(name = "inst_col")
    private String instCol;

    @Column(name = "imp_h_centr")
    private String impHCentr;

    @Column(name = "lot_cont")
    private String lotCont;

    @Column(name = "dest")
    private String dest;

    @Column(name = "tri_regroupt_bann")
    private String triRegrouptBann;

    @Column(name = "regles")
    private Long regles;

    @Column(name = "conditionnement")
    private String conditionnement;

    @Column(name = "periodicite")
    private String periodicite;

    @Column(name = "flag_mail")
    private String flagMail;

    @Column(name = "description")
    private String description;

    @Column(name = "version_mo")
    private Long versionMo;

    @Column(name = "queues_eai_in")
    private String queuesEaiIn;

    @Column(name = "queues_eai_out")
    private String queuesEaiOut;

    @Column(name = "libre_2")
    private Long libre2;

    @Column(name = "libre_4")
    private Long libre4;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIdDemande() {
        return idDemande;
    }

    public ParamDemande idDemande(String idDemande) {
        this.idDemande = idDemande;
        return this;
    }

    public void setIdDemande(String idDemande) {
        this.idDemande = idDemande;
    }

    public Long getFgcle() {
        return fgcle;
    }

    public ParamDemande fgcle(Long fgcle) {
        this.fgcle = fgcle;
        return this;
    }

    public void setFgcle(Long fgcle) {
        this.fgcle = fgcle;
    }

    public Long getNomDataLoader() {
        return nomDataLoader;
    }

    public ParamDemande nomDataLoader(Long nomDataLoader) {
        this.nomDataLoader = nomDataLoader;
        return this;
    }

    public void setNomDataLoader(Long nomDataLoader) {
        this.nomDataLoader = nomDataLoader;
    }

    public String getVersionDataLoader() {
        return versionDataLoader;
    }

    public ParamDemande versionDataLoader(String versionDataLoader) {
        this.versionDataLoader = versionDataLoader;
        return this;
    }

    public void setVersionDataLoader(String versionDataLoader) {
        this.versionDataLoader = versionDataLoader;
    }

    public Long getNomModele() {
        return nomModele;
    }

    public ParamDemande nomModele(Long nomModele) {
        this.nomModele = nomModele;
        return this;
    }

    public void setNomModele(Long nomModele) {
        this.nomModele = nomModele;
    }

    public Long getIdModele() {
        return idModele;
    }

    public ParamDemande idModele(Long idModele) {
        this.idModele = idModele;
        return this;
    }

    public void setIdModele(Long idModele) {
        this.idModele = idModele;
    }

    public String getVersionModele() {
        return versionModele;
    }

    public ParamDemande versionModele(String versionModele) {
        this.versionModele = versionModele;
        return this;
    }

    public void setVersionModele(String versionModele) {
        this.versionModele = versionModele;
    }

    public String getImpression() {
        return impression;
    }

    public ParamDemande impression(String impression) {
        this.impression = impression;
        return this;
    }

    public void setImpression(String impression) {
        this.impression = impression;
    }

    public String getArchivage() {
        return archivage;
    }

    public ParamDemande archivage(String archivage) {
        this.archivage = archivage;
        return this;
    }

    public void setArchivage(String archivage) {
        this.archivage = archivage;
    }

    public String getInteractive() {
        return interactive;
    }

    public ParamDemande interactive(String interactive) {
        this.interactive = interactive;
        return this;
    }

    public void setInteractive(String interactive) {
        this.interactive = interactive;
    }

    public String getStockage() {
        return stockage;
    }

    public ParamDemande stockage(String stockage) {
        this.stockage = stockage;
        return this;
    }

    public void setStockage(String stockage) {
        this.stockage = stockage;
    }

    public String getHostCol() {
        return hostCol;
    }

    public ParamDemande hostCol(String hostCol) {
        this.hostCol = hostCol;
        return this;
    }

    public void setHostCol(String hostCol) {
        this.hostCol = hostCol;
    }

    public String getImpCentr() {
        return impCentr;
    }

    public ParamDemande impCentr(String impCentr) {
        this.impCentr = impCentr;
        return this;
    }

    public void setImpCentr(String impCentr) {
        this.impCentr = impCentr;
    }

    public String getInstCol() {
        return instCol;
    }

    public ParamDemande instCol(String instCol) {
        this.instCol = instCol;
        return this;
    }

    public void setInstCol(String instCol) {
        this.instCol = instCol;
    }

    public String getImpHCentr() {
        return impHCentr;
    }

    public ParamDemande impHCentr(String impHCentr) {
        this.impHCentr = impHCentr;
        return this;
    }

    public void setImpHCentr(String impHCentr) {
        this.impHCentr = impHCentr;
    }

    public String getLotCont() {
        return lotCont;
    }

    public ParamDemande lotCont(String lotCont) {
        this.lotCont = lotCont;
        return this;
    }

    public void setLotCont(String lotCont) {
        this.lotCont = lotCont;
    }

    public String getDest() {
        return dest;
    }

    public ParamDemande dest(String dest) {
        this.dest = dest;
        return this;
    }

    public void setDest(String dest) {
        this.dest = dest;
    }

    public String getTriRegrouptBann() {
        return triRegrouptBann;
    }

    public ParamDemande triRegrouptBann(String triRegrouptBann) {
        this.triRegrouptBann = triRegrouptBann;
        return this;
    }

    public void setTriRegrouptBann(String triRegrouptBann) {
        this.triRegrouptBann = triRegrouptBann;
    }

    public Long getRegles() {
        return regles;
    }

    public ParamDemande regles(Long regles) {
        this.regles = regles;
        return this;
    }

    public void setRegles(Long regles) {
        this.regles = regles;
    }

    public String getConditionnement() {
        return conditionnement;
    }

    public ParamDemande conditionnement(String conditionnement) {
        this.conditionnement = conditionnement;
        return this;
    }

    public void setConditionnement(String conditionnement) {
        this.conditionnement = conditionnement;
    }

    public String getPeriodicite() {
        return periodicite;
    }

    public ParamDemande periodicite(String periodicite) {
        this.periodicite = periodicite;
        return this;
    }

    public void setPeriodicite(String periodicite) {
        this.periodicite = periodicite;
    }

    public String getFlagMail() {
        return flagMail;
    }

    public ParamDemande flagMail(String flagMail) {
        this.flagMail = flagMail;
        return this;
    }

    public void setFlagMail(String flagMail) {
        this.flagMail = flagMail;
    }

    public String getDescription() {
        return description;
    }

    public ParamDemande description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getVersionMo() {
        return versionMo;
    }

    public ParamDemande versionMo(Long versionMo) {
        this.versionMo = versionMo;
        return this;
    }

    public void setVersionMo(Long versionMo) {
        this.versionMo = versionMo;
    }

    public String getQueuesEaiIn() {
        return queuesEaiIn;
    }

    public ParamDemande queuesEaiIn(String queuesEaiIn) {
        this.queuesEaiIn = queuesEaiIn;
        return this;
    }

    public void setQueuesEaiIn(String queuesEaiIn) {
        this.queuesEaiIn = queuesEaiIn;
    }

    public String getQueuesEaiOut() {
        return queuesEaiOut;
    }

    public ParamDemande queuesEaiOut(String queuesEaiOut) {
        this.queuesEaiOut = queuesEaiOut;
        return this;
    }

    public void setQueuesEaiOut(String queuesEaiOut) {
        this.queuesEaiOut = queuesEaiOut;
    }

    public Long getLibre2() {
        return libre2;
    }

    public ParamDemande libre2(Long libre2) {
        this.libre2 = libre2;
        return this;
    }

    public void setLibre2(Long libre2) {
        this.libre2 = libre2;
    }

    public Long getLibre4() {
        return libre4;
    }

    public ParamDemande libre4(Long libre4) {
        this.libre4 = libre4;
        return this;
    }

    public void setLibre4(Long libre4) {
        this.libre4 = libre4;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ParamDemande)) {
            return false;
        }
        return id != null && id.equals(((ParamDemande) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ParamDemande{" +
            "id=" + getId() +
            ", idDemande='" + getIdDemande() + "'" +
            ", fgcle=" + getFgcle() +
            ", nomDataLoader=" + getNomDataLoader() +
            ", versionDataLoader='" + getVersionDataLoader() + "'" +
            ", nomModele=" + getNomModele() +
            ", idModele=" + getIdModele() +
            ", versionModele='" + getVersionModele() + "'" +
            ", impression='" + getImpression() + "'" +
            ", archivage='" + getArchivage() + "'" +
            ", interactive='" + getInteractive() + "'" +
            ", stockage='" + getStockage() + "'" +
            ", hostCol='" + getHostCol() + "'" +
            ", impCentr='" + getImpCentr() + "'" +
            ", instCol='" + getInstCol() + "'" +
            ", impHCentr='" + getImpHCentr() + "'" +
            ", lotCont='" + getLotCont() + "'" +
            ", dest='" + getDest() + "'" +
            ", triRegrouptBann='" + getTriRegrouptBann() + "'" +
            ", regles=" + getRegles() +
            ", conditionnement='" + getConditionnement() + "'" +
            ", periodicite='" + getPeriodicite() + "'" +
            ", flagMail='" + getFlagMail() + "'" +
            ", description='" + getDescription() + "'" +
            ", versionMo=" + getVersionMo() +
            ", queuesEaiIn='" + getQueuesEaiIn() + "'" +
            ", queuesEaiOut='" + getQueuesEaiOut() + "'" +
            ", libre2=" + getLibre2() +
            ", libre4=" + getLibre4() +
            "}";
    }
}
