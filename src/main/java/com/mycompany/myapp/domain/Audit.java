package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.Instant;

import com.mycompany.myapp.domain.enumeration.Action;

/**
 * A Audit.
 */
@Entity
@Table(name = "audit")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Audit implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_audit")
    private Long idAudit;

    @Column(name = "id_edition")
    private Long idEdition;

    @Column(name = "date")
    private Instant date;

    @Column(name = "badge")
    private String badge;

    @Enumerated(EnumType.STRING)
    @Column(name = "action")
    private Action action;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdAudit() {
        return idAudit;
    }

    public Audit idAudit(Long idAudit) {
        this.idAudit = idAudit;
        return this;
    }

    public void setIdAudit(Long idAudit) {
        this.idAudit = idAudit;
    }

    public Long getIdEdition() {
        return idEdition;
    }

    public Audit idEdition(Long idEdition) {
        this.idEdition = idEdition;
        return this;
    }

    public void setIdEdition(Long idEdition) {
        this.idEdition = idEdition;
    }

    public Instant getDate() {
        return date;
    }

    public Audit date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public String getBadge() {
        return badge;
    }

    public Audit badge(String badge) {
        this.badge = badge;
        return this;
    }

    public void setBadge(String badge) {
        this.badge = badge;
    }

    public Action getAction() {
        return action;
    }

    public Audit action(Action action) {
        this.action = action;
        return this;
    }

    public void setAction(Action action) {
        this.action = action;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Audit)) {
            return false;
        }
        return id != null && id.equals(((Audit) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Audit{" +
            "id=" + getId() +
            ", idAudit=" + getIdAudit() +
            ", idEdition=" + getIdEdition() +
            ", date='" + getDate() + "'" +
            ", badge='" + getBadge() + "'" +
            ", action='" + getAction() + "'" +
            "}";
    }
}
