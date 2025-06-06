const BASE_URL = 'https://norma.nomoreparties.space/api';

beforeEach(() => {
  cy.intercept('GET', `${BASE_URL}/ingredients`, { fixture: 'ingredients.json' }).as('getIngredients');
  cy.intercept('POST', `${BASE_URL}/auth/login`, { fixture: 'userlog.json' });
  cy.intercept('GET', `${BASE_URL}/auth/user`, { fixture: 'userlog.json' });
  cy.intercept('POST', `${BASE_URL}/orders`, { fixture: 'order-response.json' });
  cy.visit('/');
  cy.viewport(1440, 800);
  cy.wait('@getIngredients');
  cy.get('#modals').as('modal');
});

describe('Функциональность конструктора бургера', () => {
  it('инкрементирует счётчик при добавлении ингредиента', () => {
    cy.fixture('ingredients.json').then((data) => {
      const filling = data.data.find(i => i.type === 'main');
      cy.get(`[data-cy="${filling._id}"]`).should('exist').find('button').click();
      cy.get(`[data-cy="${filling._id}"]`).find('.counter__num').should('contain.text', '1');
    });
  });

  describe('Добавление ингредиентов', () => {
    it('добавляет булку и начинку в заказ', () => {
      cy.fixture('ingredients.json').then((data) => {
        const bun = data.data.find(i => i.type === 'bun');
        const filling = data.data.find(i => i.type === 'main');
        cy.get(`[data-cy="${bun._id}"]`).find('button').click();
        cy.get(`[data-cy="${filling._id}"]`).find('button').click();
      });
    });

    it('добавляет булку после начинки', () => {
      cy.fixture('ingredients.json').then((data) => {
        const bun = data.data.find(i => i.type === 'bun');
        const filling = data.data.find(i => i.type === 'main');
        cy.get(`[data-cy="${filling._id}"]`).find('button').click();
        cy.get(`[data-cy="${bun._id}"]`).find('button').click();
      });
    });
  });

  describe('Замена булки', () => {
    it('заменяет булку при пустом списке начинок', () => {
      cy.fixture('ingredients.json').then((data) => {
        const buns = data.data.filter(i => i.type === 'bun');
        cy.get(`[data-cy="${buns[0]._id}"]`).find('button').click();
        cy.get(`[data-cy="${buns[1]._id}"]`).find('button').click();
      });
    });

    it('заменяет булку при наличии начинки', () => {
      cy.fixture('ingredients.json').then((data) => {
        const buns = data.data.filter(i => i.type === 'bun');
        const filling = data.data.find(i => i.type === 'main');
        cy.get(`[data-cy="${buns[0]._id}"]`).find('button').click();
        cy.get(`[data-cy="${filling._id}"]`).find('button').click();
        cy.get(`[data-cy="${buns[1]._id}"]`).find('button').click();
      });
    });
  });
});

describe('Оформление заказа', () => {
  beforeEach(() => {
    window.localStorage.setItem('refreshToken', 'ipsum');
    cy.setCookie('accessToken', 'lorem');
  });

  afterEach(() => {
    window.localStorage.clear();
    cy.clearAllCookies();
  });

  it('отправляет заказ и отображает номер', () => {
    cy.fixture('ingredients.json').then((data) => {
      const bun = data.data.find(i => i.type === 'bun');
      const filling = data.data.find(i => i.type === 'main');
      cy.get(`[data-cy="${bun._id}"]`).find('button').click();
      cy.get(`[data-cy="${filling._id}"]`).find('button').click();
      cy.get('[data-cy="order-button"]').click();
      cy.get('@modal').find('h2').should('contain.text', '80404');
    });
  });
});

describe('Работа модальных окон ингредиента', () => {
  it('открывает модалку с деталями ингредиента', () => {
    cy.fixture('ingredients.json').then((data) => {
      const filling = data.data.find(i => i.type === 'main');
      cy.get('@modal').should('be.empty');
      cy.get(`[data-cy="${filling._id}"]`).find('a').click();
      cy.get('@modal').should('not.be.empty');
      cy.url().should('include', filling._id);
    });
  });

  it('закрывает модалку по крестику', () => {
    cy.fixture('ingredients.json').then((data) => {
      const filling = data.data.find(i => i.type === 'main');
      cy.get(`[data-cy="${filling._id}"]`).find('a').click();
      cy.get('@modal').find('button').click();
      cy.get('@modal').should('be.empty');
    });
  });

  it('закрывает модалку по оверлею', () => {
    cy.fixture('ingredients.json').then((data) => {
      const filling = data.data.find(i => i.type === 'main');
      cy.get(`[data-cy="${filling._id}"]`).find('a').click();
      cy.get('[data-cy="overlay"]').click({ force: true });
      cy.get('@modal').should('be.empty');
    });
  });

  it('закрывает модалку по Escape', () => {
    cy.fixture('ingredients.json').then((data) => {
      const filling = data.data.find(i => i.type === 'main');
      cy.get(`[data-cy="${filling._id}"]`).find('a').click();
      cy.get('body').trigger('keydown', { key: 'Escape' });
      cy.get('@modal').should('be.empty');
    });
  });
});
