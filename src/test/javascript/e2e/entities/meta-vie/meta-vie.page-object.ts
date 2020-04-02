import { element, by, ElementFinder } from 'protractor';

export class MetaVieComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-meta-vie div table .btn-danger'));
  title = element.all(by.css('jhi-meta-vie div h2#page-heading span')).first();
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

export class MetaVieUpdatePage {
  pageTitle = element(by.id('jhi-meta-vie-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idTechInput = element(by.id('field_idTech'));
  numSousInput = element(by.id('field_numSous'));
  numContratVieInput = element(by.id('field_numContratVie'));

  idTechSelect = element(by.id('field_idTech'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdTechInput(idTech: string): Promise<void> {
    await this.idTechInput.sendKeys(idTech);
  }

  async getIdTechInput(): Promise<string> {
    return await this.idTechInput.getAttribute('value');
  }

  async setNumSousInput(numSous: string): Promise<void> {
    await this.numSousInput.sendKeys(numSous);
  }

  async getNumSousInput(): Promise<string> {
    return await this.numSousInput.getAttribute('value');
  }

  async setNumContratVieInput(numContratVie: string): Promise<void> {
    await this.numContratVieInput.sendKeys(numContratVie);
  }

  async getNumContratVieInput(): Promise<string> {
    return await this.numContratVieInput.getAttribute('value');
  }

  async idTechSelectLastOption(): Promise<void> {
    await this.idTechSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async idTechSelectOption(option: string): Promise<void> {
    await this.idTechSelect.sendKeys(option);
  }

  getIdTechSelect(): ElementFinder {
    return this.idTechSelect;
  }

  async getIdTechSelectedOption(): Promise<string> {
    return await this.idTechSelect.element(by.css('option:checked')).getText();
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

export class MetaVieDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-metaVie-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-metaVie'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
