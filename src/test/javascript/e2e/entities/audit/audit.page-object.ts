import { element, by, ElementFinder } from 'protractor';

export class AuditComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-audit div table .btn-danger'));
  title = element.all(by.css('jhi-audit div h2#page-heading span')).first();
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

export class AuditUpdatePage {
  pageTitle = element(by.id('jhi-audit-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idAuditInput = element(by.id('field_idAudit'));
  idEditionInput = element(by.id('field_idEdition'));
  dateInput = element(by.id('field_date'));
  badgeInput = element(by.id('field_badge'));
  actionSelect = element(by.id('field_action'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdAuditInput(idAudit: string): Promise<void> {
    await this.idAuditInput.sendKeys(idAudit);
  }

  async getIdAuditInput(): Promise<string> {
    return await this.idAuditInput.getAttribute('value');
  }

  async setIdEditionInput(idEdition: string): Promise<void> {
    await this.idEditionInput.sendKeys(idEdition);
  }

  async getIdEditionInput(): Promise<string> {
    return await this.idEditionInput.getAttribute('value');
  }

  async setDateInput(date: string): Promise<void> {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput(): Promise<string> {
    return await this.dateInput.getAttribute('value');
  }

  async setBadgeInput(badge: string): Promise<void> {
    await this.badgeInput.sendKeys(badge);
  }

  async getBadgeInput(): Promise<string> {
    return await this.badgeInput.getAttribute('value');
  }

  async setActionSelect(action: string): Promise<void> {
    await this.actionSelect.sendKeys(action);
  }

  async getActionSelect(): Promise<string> {
    return await this.actionSelect.element(by.css('option:checked')).getText();
  }

  async actionSelectLastOption(): Promise<void> {
    await this.actionSelect
      .all(by.tagName('option'))
      .last()
      .click();
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

export class AuditDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-audit-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-audit'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
