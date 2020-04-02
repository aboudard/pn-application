package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A MetaCoheris.
 */
@Entity
@Table(name = "meta_coheris")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MetaCoheris implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_tech")
    private Long idTech;

    @Column(name = "societe")
    private String societe;

    @Column(name = "num_sous")
    private String numSous;

    @Column(name = "num_grc")
    private String numGRC;

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

    public MetaCoheris idTech(Long idTech) {
        this.idTech = idTech;
        return this;
    }

    public void setIdTech(Long idTech) {
        this.idTech = idTech;
    }

    public String getSociete() {
        return societe;
    }

    public MetaCoheris societe(String societe) {
        this.societe = societe;
        return this;
    }

    public void setSociete(String societe) {
        this.societe = societe;
    }

    public String getNumSous() {
        return numSous;
    }

    public MetaCoheris numSous(String numSous) {
        this.numSous = numSous;
        return this;
    }

    public void setNumSous(String numSous) {
        this.numSous = numSous;
    }

    public String getNumGRC() {
        return numGRC;
    }

    public MetaCoheris numGRC(String numGRC) {
        this.numGRC = numGRC;
        return this;
    }

    public void setNumGRC(String numGRC) {
        this.numGRC = numGRC;
    }

    public Demande getIdTech() {
        return idTech;
    }

    public MetaCoheris idTech(Demande demande) {
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
        if (!(o instanceof MetaCoheris)) {
            return false;
        }
        return id != null && id.equals(((MetaCoheris) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "MetaCoheris{" +
            "id=" + getId() +
            ", idTech=" + getIdTech() +
            ", societe='" + getSociete() + "'" +
            ", numSous='" + getNumSous() + "'" +
            ", numGRC='" + getNumGRC() + "'" +
            "}";
    }
}
