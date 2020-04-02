package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A MetaRecouvrement.
 */
@Entity
@Table(name = "meta_recouvrement")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MetaRecouvrement implements Serializable {

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

    public MetaRecouvrement idTech(Long idTech) {
        this.idTech = idTech;
        return this;
    }

    public void setIdTech(Long idTech) {
        this.idTech = idTech;
    }

    public String getSociete() {
        return societe;
    }

    public MetaRecouvrement societe(String societe) {
        this.societe = societe;
        return this;
    }

    public void setSociete(String societe) {
        this.societe = societe;
    }

    public String getNumSous() {
        return numSous;
    }

    public MetaRecouvrement numSous(String numSous) {
        this.numSous = numSous;
        return this;
    }

    public void setNumSous(String numSous) {
        this.numSous = numSous;
    }

    public Demande getIdTech() {
        return idTech;
    }

    public MetaRecouvrement idTech(Demande demande) {
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
        if (!(o instanceof MetaRecouvrement)) {
            return false;
        }
        return id != null && id.equals(((MetaRecouvrement) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "MetaRecouvrement{" +
            "id=" + getId() +
            ", idTech=" + getIdTech() +
            ", societe='" + getSociete() + "'" +
            ", numSous='" + getNumSous() + "'" +
            "}";
    }
}
