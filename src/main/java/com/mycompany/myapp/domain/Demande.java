package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import com.mycompany.myapp.domain.enumeration.Statut;

/**
 * Entity Flux
 */
@ApiModel(description = "Entity Flux")
@Entity
@Table(name = "demande")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Demande implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "id_tech", nullable = false)
    private Long idTech;

    @Column(name = "domaine")
    private String domaine;

    @Column(name = "id_demande")
    private String idDemande;

    @Column(name = "badge")
    private String badge;

    @Column(name = "date_demande")
    private Instant dateDemande;

    @Enumerated(EnumType.STRING)
    @Column(name = "statut")
    private Statut statut;

    @Lob
    @Column(name = "flux")
    private byte[] flux;

    @Column(name = "flux_content_type")
    private String fluxContentType;

    @OneToOne(mappedBy = "idTech")
    @JsonIgnore
    private MetaProduction idTech;

    @ManyToMany(mappedBy = "idEditions")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<DocFlux> idDemandes = new HashSet<>();

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

    public Demande idTech(Long idTech) {
        this.idTech = idTech;
        return this;
    }

    public void setIdTech(Long idTech) {
        this.idTech = idTech;
    }

    public String getDomaine() {
        return domaine;
    }

    public Demande domaine(String domaine) {
        this.domaine = domaine;
        return this;
    }

    public void setDomaine(String domaine) {
        this.domaine = domaine;
    }

    public String getIdDemande() {
        return idDemande;
    }

    public Demande idDemande(String idDemande) {
        this.idDemande = idDemande;
        return this;
    }

    public void setIdDemande(String idDemande) {
        this.idDemande = idDemande;
    }

    public String getBadge() {
        return badge;
    }

    public Demande badge(String badge) {
        this.badge = badge;
        return this;
    }

    public void setBadge(String badge) {
        this.badge = badge;
    }

    public Instant getDateDemande() {
        return dateDemande;
    }

    public Demande dateDemande(Instant dateDemande) {
        this.dateDemande = dateDemande;
        return this;
    }

    public void setDateDemande(Instant dateDemande) {
        this.dateDemande = dateDemande;
    }

    public Statut getStatut() {
        return statut;
    }

    public Demande statut(Statut statut) {
        this.statut = statut;
        return this;
    }

    public void setStatut(Statut statut) {
        this.statut = statut;
    }

    public byte[] getFlux() {
        return flux;
    }

    public Demande flux(byte[] flux) {
        this.flux = flux;
        return this;
    }

    public void setFlux(byte[] flux) {
        this.flux = flux;
    }

    public String getFluxContentType() {
        return fluxContentType;
    }

    public Demande fluxContentType(String fluxContentType) {
        this.fluxContentType = fluxContentType;
        return this;
    }

    public void setFluxContentType(String fluxContentType) {
        this.fluxContentType = fluxContentType;
    }

    public MetaProduction getIdTech() {
        return idTech;
    }

    public Demande idTech(MetaProduction metaProduction) {
        this.idTech = metaProduction;
        return this;
    }

    public void setIdTech(MetaProduction metaProduction) {
        this.idTech = metaProduction;
    }

    public Set<DocFlux> getIdDemandes() {
        return idDemandes;
    }

    public Demande idDemandes(Set<DocFlux> docFluxes) {
        this.idDemandes = docFluxes;
        return this;
    }

    public Demande addIdDemande(DocFlux docFlux) {
        this.idDemandes.add(docFlux);
        docFlux.getIdEditions().add(this);
        return this;
    }

    public Demande removeIdDemande(DocFlux docFlux) {
        this.idDemandes.remove(docFlux);
        docFlux.getIdEditions().remove(this);
        return this;
    }

    public void setIdDemandes(Set<DocFlux> docFluxes) {
        this.idDemandes = docFluxes;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Demande)) {
            return false;
        }
        return id != null && id.equals(((Demande) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Demande{" +
            "id=" + getId() +
            ", idTech=" + getIdTech() +
            ", domaine='" + getDomaine() + "'" +
            ", idDemande='" + getIdDemande() + "'" +
            ", badge='" + getBadge() + "'" +
            ", dateDemande='" + getDateDemande() + "'" +
            ", statut='" + getStatut() + "'" +
            ", flux='" + getFlux() + "'" +
            ", fluxContentType='" + getFluxContentType() + "'" +
            "}";
    }
}
