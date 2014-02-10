require 'spec_helper'

describe "Static pages" do
  context "when page 'Index'" do
    it "have content 'Сахарный сезон'" do
      visit "/"
      expect(page).to have_content("Сахарный сезон")
    end
  end
  context "when page 'Investing'" do
    it "have content 'Инвестиции'" do
      visit "/investing"
      expect(page).to have_content("Модельные портфели")
    end
  end
  context "when page 'Model portfolios'" do
    it "have content 'Готовое решение для инвесторов'" do
      visit "/investing/model-portfolios"
      expect(page).to have_content("Готовое решение для инвесторов")
    end
  end
  context "when page 'Structural products'" do
    it "have content 'Действующие продукты'" do
      visit "/investing/structural-products"
      expect(page).to have_content("Действующие продукты")
    end
  end
  context "when page 'Personal broker'" do
    it "have content 'Персональный подход'" do
      visit "/investing/personal-broker"
      expect(page).to have_content("Персональный подход")
    end
  end
  context "when page 'Open advisor'" do
    it "have content 'Роботы сохраняют ваше время'" do
      visit "/investing/open-advisor"
      expect(page).to have_content("Роботы сохраняют ваше время")
    end
  end
  context "when page 'Trading'" do
    it "have content 'Трейдинг'" do
      visit "/trading"
      expect(page).to have_content("Инструменты")
    end
  end
  context "when page 'trading/services'" do
    it "have content 'Сервисы и инструменты'" do
      visit "/trading/services"
      expect(page).to have_content("Сервисы и инструменты")
    end
  end
  context "when page 'Pricing-plans'" do
    it "have content 'Подобрать тариф'" do
      visit "/pricing-plans"
      expect(page).to have_content("Подобрать тариф")
    end
  end
  context "when page 'Analytics'" do
    it "have content 'Аналитика'" do
      visit "/analytics"
      expect(page).to have_content("Инвест идеи")
    end
  end
  context "when page 'learning'" do
    it "have content 'Обучение'" do
      visit "/learning"
      expect(page).to have_content("События")
    end
  end
  context "when page 'open-account'" do
    it "have content 'Открыть счёт'" do
      visit "/open-account"
      expect(page).to have_content("формирования договора")
    end
  end
  context "when page 'open-demo-account'" do
    it "have content 'Демо–счёт'" do
      visit "/open-demo-account"
      expect(page).to have_content("Выбирайте платформу")
    end
  end
  context "when page 'About'" do
    it "have content 'одна из ведущих брокерских компаний России'" do
      visit "/about"
      expect(page).to have_content("одна из ведущих брокерских компаний России")
    end
  end
  context "when page 'Company news'" do
    it "have content 'Новости компании'" do
      visit "/about/news"
      expect(page).to have_content("Новости компании")
    end
  end
  context "when page 'Company branches'" do
    it "have content 'Новосибирск'" do
      visit "/about/branch"
      expect(page).to have_content("Новосибирск")
    end
  end
  context "when page 'Company disclosure'" do
    it "have content 'Паспорт ОАО «Брокерский дом «ОТКРЫТИЕ»'" do
      visit "/about/disclosure"
      expect(page).to have_content("Паспорт ОАО «Брокерский дом «ОТКРЫТИЕ»")
    end
  end
  
  
end
