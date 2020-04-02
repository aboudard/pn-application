package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A MetaSIRH.
 */
@Entity
@Table(name = "meta_sirh")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MetaSIRH implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_tech")
    private Long idTech;

    @Column(name = "num_badge")
    private String numBadge;

    @Column(name = "num_badge_dest")
    private String numBadgeDest;

    @Column(name = "nom_collab")
    private String nomCollab;

    @Column(name = "prenom_collab")
    private String prenomCollab;

    @Column(name = "code_uo")
    private String codeUO;

    @OneToOne
    @JoinColumn(unique = true)
    private Demande idTech;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdTech() {
        return idTech;
    }

    public MetaSIRH idTech(Long idTech) {
        this.idTech = idTech;
        return this;
    }

    public void setIdTech(Long idTech) {
        this.idTech = idTech;
    }

    public String getNumBadge() {
        return numBadge;
    }

    public MetaSIRH numBadge(String numBadge) {
        this.numBadge = numBadge;
        return this;
    }

    public void setNumBadge(String numBadge) {
        this.numBadge = numBadge;
    }

    public String getNumBadgeDest() {
        return numBadgeDest;
    }

    public MetaSIRH numBadgeDest(String numBadgeDest) {
        this.numBadgeDest = numBadgeDest;
        return this;
    }

    public void setNumBadgeDest(String numBadgeDest) {
        this.numBadgeDest = numBadgeDest;
    }

    public String getNomCollab() {
        return nomCollab;
    }

    public MetaSIRH nomCollab(String nomCollab) {
        this.nomCollab = nomCollab;
        return this;
    }

    public void setNomCollab(String nomCollab) {
        this.nomCollab = nomCollab;
    }

    public String getPrenomCollab() {
        return prenomCollab;
    }

    public MetaSIRH prenomCollab(String prenomCollab) {
        this.prenomCollab = prenomCollab;
        return this;
    }

    public void setPrenomCollab(String prenomCollab) {
        this.prenomCollab = prenomCollab;
    }

    public String getCodeUO() {
        return codeUO;
    }

    public MetaSIRH codeUO(String codeUO) {
        this.codeUO = codeUO;
        return this;
    }

    public void setCodeUO(String codeUO) {
        this.codeUO = codeUO;
    }

    public Demande getIdTech() {
        return idTech;
    }

    public MetaSIRH idTech(Demande demande) {
        this.idTech = demande;
        return this;
    }

    public void setIdTech(Demande demande) {
        this.idTech = demande;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MetaSIRH)) {
            return false;
        }
        return id != null && id.equals(((MetaSIRH) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "MetaSIRH{" +
            "id=" + getId() +
            ", idTech=" + getIdTech() +
            ", numBadge='" + getNumBadge() + "'" +
            ", numBadgeDest='" + getNumBadgeDest() + "'" +
            ", nomCollab='" + getNomCollab() + "'" +
            ", prenomCollab='" + getPrenomCollab() + "'" +
            ", codeUO='" + getCodeUO() + "'" +
            "}";
    }
}
