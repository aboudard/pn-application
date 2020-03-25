package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A DocFlux.
 */
@Entity
@Table(name = "doc_flux")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DocFlux implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_edition")
    private String idEdition;

    @Column(name = "libelle")
    private String libelle;

    @Column(name = "modele")
    private String modele;

    @Column(name = "famille")
    private String famille;

    @Column(name = "version")
    private String version;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "doc_flux_id_edition",
               joinColumns = @JoinColumn(name = "doc_flux_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "id_edition_id", referencedColumnName = "id"))
    private Set<Demande> idEditions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIdEdition() {
        return idEdition;
    }

    public DocFlux idEdition(String idEdition) {
        this.idEdition = idEdition;
        return this;
    }

    public void setIdEdition(String idEdition) {
        this.idEdition = idEdition;
    }

    public String getLibelle() {
        return libelle;
    }

    public DocFlux libelle(String libelle) {
        this.libelle = libelle;
        return this;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public String getModele() {
        return modele;
    }

    public DocFlux modele(String modele) {
        this.modele = modele;
        return this;
    }

    public void setModele(String modele) {
        this.modele = modele;
    }

    public String getFamille() {
        return famille;
    }

    public DocFlux famille(String famille) {
        this.famille = famille;
        return this;
    }

    public void setFamille(String famille) {
        this.famille = famille;
    }

    public String getVersion() {
        return version;
    }

    public DocFlux version(String version) {
        this.version = version;
        return this;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public Set<Demande> getIdEditions() {
        return idEditions;
    }

    public DocFlux idEditions(Set<Demande> demandes) {
        this.idEditions = demandes;
        return this;
    }

    public DocFlux addIdEdition(Demande demande) {
        this.idEditions.add(demande);
        demande.getIdDemandes().add(this);
        return this;
    }

    public DocFlux removeIdEdition(Demande demande) {
        this.idEditions.remove(demande);
        demande.getIdDemandes().remove(this);
        return this;
    }

    public void setIdEditions(Set<Demande> demandes) {
        this.idEditions = demandes;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DocFlux)) {
            return false;
        }
        return id != null && id.equals(((DocFlux) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "DocFlux{" +
            "id=" + getId() +
            ", idEdition='" + getIdEdition() + "'" +
            ", libelle='" + getLibelle() + "'" +
            ", modele='" + getModele() + "'" +
            ", famille='" + getFamille() + "'" +
            ", version='" + getVersion() + "'" +
            "}";
    }
}
