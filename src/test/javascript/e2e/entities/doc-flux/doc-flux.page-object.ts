import { element, by, ElementFinder } from 'protractor';

export class DocFluxComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-doc-flux div table .btn-danger'));
  title = element.all(by.css('jhi-doc-flux div h2#page-heading span')).first();
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

export class DocFluxUpdatePage {
  pageTitle = element(by.id('jhi-doc-flux-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idEditionInput = element(by.id('field_idEdition'));
  libelleInput = element(by.id('field_libelle'));
  modeleInput = element(by.id('field_modele'));
  familleInput = element(by.id('field_famille'));
  versionInput = element(by.id('field_version'));

  idEditionSelect = element(by.id('field_idEdition'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdEditionInput(idEdition: string): Promise<void> {
    await this.idEditionInput.sendKeys(idEdition);
  }

  async getIdEditionInput(): Promise<string> {
    return await this.idEditionInput.getAttribute('value');
  }

  async setLibelleInput(libelle: string): Promise<void> {
    await this.libelleInput.sendKeys(libelle);
  }

  async getLibelleInput(): Promise<string> {
    return await this.libelleInput.getAttribute('value');
  }

  async setModeleInput(modele: string): Promise<void> {
    await this.modeleInput.sendKeys(modele);
  }

  async getModeleInput(): Promise<string> {
    return await this.modeleInput.getAttribute('value');
  }

  async setFamilleInput(famille: string): Promise<void> {
    await this.familleInput.sendKeys(famille);
  }

  async getFamilleInput(): Promise<string> {
    return await this.familleInput.getAttribute('value');
  }

  async setVersionInput(version: string): Promise<void> {
    await this.versionInput.sendKeys(version);
  }

  async getVersionInput(): Promise<string> {
    return await this.versionInput.getAttribute('value');
  }

  async idEditionSelectLastOption(): Promise<void> {
    await this.idEditionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async idEditionSelectOption(option: string): Promise<void> {
    await this.idEditionSelect.sendKeys(option);
  }

  getIdEditionSelect(): ElementFinder {
    return this.idEditionSelect;
  }

  async getIdEditionSelectedOption(): Promise<string> {
    return await this.idEditionSelect.element(by.css('option:checked')).getText();
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

export class DocFluxDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-docFlux-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-docFlux'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
