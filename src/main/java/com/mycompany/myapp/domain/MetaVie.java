package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A MetaVie.
 */
@Entity
@Table(name = "meta_vie")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MetaVie implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_tech")
    private Long idTech;

    @Column(name = "num_sous")
    private String numSous;

    @Column(name = "num_contrat_vie")
    private String numContratVie;

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

    public MetaVie idTech(Long idTech) {
        this.idTech = idTech;
        return this;
    }

    public void setIdTech(Long idTech) {
        this.idTech = idTech;
    }

    public String getNumSous() {
        return numSous;
    }

    public MetaVie numSous(String numSous) {
        this.numSous = numSous;
        return this;
    }

    public void setNumSous(String numSous) {
        this.numSous = numSous;
    }

    public String getNumContratVie() {
        return numContratVie;
    }

    public MetaVie numContratVie(String numContratVie) {
        this.numContratVie = numContratVie;
        return this;
    }

    public void setNumContratVie(String numContratVie) {
        this.numContratVie = numContratVie;
    }

    public Demande getIdTech() {
        return idTech;
    }

    public MetaVie idTech(Demande demande) {
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
        if (!(o instanceof MetaVie)) {
            return false;
        }
        return id != null && id.equals(((MetaVie) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "MetaVie{" +
            "id=" + getId() +
            ", idTech=" + getIdTech() +
            ", numSous='" + getNumSous() + "'" +
            ", numContratVie='" + getNumContratVie() + "'" +
            "}";
    }
}
