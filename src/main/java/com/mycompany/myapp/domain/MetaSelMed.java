package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A MetaSelMed.
 */
@Entity
@Table(name = "meta_sel_med")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MetaSelMed implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_tech")
    private Long idTech;

    @Column(name = "num_sous")
    private String numSous;

    @Column(name = "num_dossier")
    private String numDossier;

    @Column(name = "nom_assure")
    private String nomAssure;

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

    public MetaSelMed idTech(Long idTech) {
        this.idTech = idTech;
        return this;
    }

    public void setIdTech(Long idTech) {
        this.idTech = idTech;
    }

    public String getNumSous() {
        return numSous;
    }

    public MetaSelMed numSous(String numSous) {
        this.numSous = numSous;
        return this;
    }

    public void setNumSous(String numSous) {
        this.numSous = numSous;
    }

    public String getNumDossier() {
        return numDossier;
    }

    public MetaSelMed numDossier(String numDossier) {
        this.numDossier = numDossier;
        return this;
    }

    public void setNumDossier(String numDossier) {
        this.numDossier = numDossier;
    }

    public String getNomAssure() {
        return nomAssure;
    }

    public MetaSelMed nomAssure(String nomAssure) {
        this.nomAssure = nomAssure;
        return this;
    }

    public void setNomAssure(String nomAssure) {
        this.nomAssure = nomAssure;
    }

    public Demande getIdTech() {
        return idTech;
    }

    public MetaSelMed idTech(Demande demande) {
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
        if (!(o instanceof MetaSelMed)) {
            return false;
        }
        return id != null && id.equals(((MetaSelMed) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "MetaSelMed{" +
            "id=" + getId() +
            ", idTech=" + getIdTech() +
            ", numSous='" + getNumSous() + "'" +
            ", numDossier='" + getNumDossier() + "'" +
            ", nomAssure='" + getNomAssure() + "'" +
            "}";
    }
}
