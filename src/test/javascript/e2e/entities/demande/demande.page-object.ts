import { element, by, ElementFinder } from 'protractor';

export class DemandeComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-demande div table .btn-danger'));
  title = element.all(by.css('jhi-demande div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class DemandeUpdatePage {
  pageTitle = element(by.id('jhi-demande-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idTechInput = element(by.id('field_idTech'));
  domaineInput = element(by.id('field_domaine'));
  idDemandeInput = element(by.id('field_idDemande'));
  badgeInput = element(by.id('field_badge'));
  dateDemandeInput = element(by.id('field_dateDemande'));
  statutSelect = element(by.id('field_statut'));
  fluxInput = element(by.id('file_flux'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdTechInput(idTech: string): Promise<void> {
    await this.idTechInput.sendKeys(idTech);
  }

  async getIdTechInput(): Promise<string> {
    return await this.idTechInput.getAttribute('value');
  }

  async setDomaineInput(domaine: string): Promise<void> {
    await this.domaineInput.sendKeys(domaine);
  }

  async getDomaineInput(): Promise<string> {
    return await this.domaineInput.getAttribute('value');
  }

  async setIdDemandeInput(idDemande: string): Promise<void> {
    await this.idDemandeInput.sendKeys(idDemande);
  }

  async getIdDemandeInput(): Promise<string> {
    return await this.idDemandeInput.getAttribute('value');
  }

  async setBadgeInput(badge: string): Promise<void> {
    await this.badgeInput.sendKeys(badge);
  }

  async getBadgeInput(): Promise<string> {
    return await this.badgeInput.getAttribute('value');
  }

  async setDateDemandeInput(dateDemande: string): Promise<void> {
    await this.dateDemandeInput.sendKeys(dateDemande);
  }

  async getDateDemandeInput(): Promise<string> {
    return await this.dateDemandeInput.getAttribute('value');
  }

  async setStatutSelect(statut: string): Promise<void> {
    await this.statutSelect.sendKeys(statut);
  }

  async getStatutSelect(): Promise<string> {
    return await this.statutSelect.element(by.css('option:checked')).getText();
  }

  async statutSelectLastOption(): Promise<void> {
    await this.statutSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setFluxInput(flux: string): Promise<void> {
    await this.fluxInput.sendKeys(flux);
  }

  async getFluxInput(): Promise<string> {
    return await this.fluxInput.getAttribute('value');
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class DemandeDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-demande-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-demande'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
