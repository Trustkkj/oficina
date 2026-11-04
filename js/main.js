'use strict';
// Único ponto de configuração. Use somente um número autorizado, com DDI e DDD.
// Exemplo de formato: apenas dígitos, sem +, espaços ou pontuação. Vazio = demo.
const WHATSAPP_NUMBER = '';
const header = document.querySelector('.header');
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  header.classList.remove('menu-open');
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Abrir menu');
}
menu.addEventListener('click', () => {
  const open = !header.classList.contains('menu-open');
  header.classList.toggle('menu-open', open);
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});
navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && header.classList.contains('menu-open')) { closeMenu(); menu.focus(); } });
document.addEventListener('click', event => { if (!header.contains(event.target)) closeMenu(); });
window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);
function updateHeader() { header.classList.toggle('scrolled', window.scrollY > 30); }
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();
if ('IntersectionObserver' in window) {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('js-motion');
    const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); reveal.unobserve(entry.target); }
    }), { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(element => reveal.observe(element));
  }
  const sections = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) navigation.querySelectorAll('a').forEach(link => {
      const active = link.hash === `#${entry.target.id}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
    });
  }), { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
  document.querySelectorAll('main section[id]').forEach(section => sections.observe(section));
}
const form = document.querySelector('#quote-form');
const result = document.querySelector('#form-result');
const title = document.querySelector('#result-title');
const preview = document.querySelector('#message-preview');
const whatsapp = document.querySelector('#whatsapp-link');
const configured = /^[1-9]\d{7,14}$/.test(WHATSAPP_NUMBER);
const fields = ['name', 'vehicle', 'service', 'description'];
const errors = { name: 'Informe seu nome com pelo menos 2 caracteres.', vehicle: 'Informe o modelo do veículo.', service: 'Selecione um serviço.', description: 'Descreva o problema com pelo menos 10 caracteres.' };
function resetResult() { result.hidden = true; whatsapp.hidden = true; whatsapp.removeAttribute('href'); }
function validate(id) {
  const field = form.elements[id];
  const valid = field.value.trim().length >= (id === 'description' ? 10 : id === 'service' ? 1 : 2) && field.checkValidity();
  field.setAttribute('aria-invalid', String(!valid));
  field.setAttribute('aria-describedby', `${id}-error`);
  document.getElementById(`${id}-error`).textContent = valid ? '' : errors[id];
  return valid;
}
form.addEventListener('input', event => { resetResult(); if (fields.includes(event.target.id) && event.target.hasAttribute('aria-invalid')) validate(event.target.id); });
form.addEventListener('change', resetResult);
document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => {
  form.elements.service.value = link.dataset.service;
  if (form.elements.service.hasAttribute('aria-invalid')) validate('service');
  resetResult();
}));
form.addEventListener('submit', event => {
  event.preventDefault();
  const invalid = fields.filter(id => !validate(id));
  if (invalid.length) { resetResult(); form.elements[invalid[0]].focus(); return; }
  const value = id => form.elements[id].value.trim();
  const message = `Olá, VÉRTICE AUTO! Gostaria de solicitar um orçamento.\n\nNome: ${value('name')}\nVeículo: ${value('vehicle')}\nServiço: ${value('service')}\n\nDescrição do problema:\n${value('description')}`;
  preview.textContent = message;
  title.textContent = configured ? 'Solicitação pronta. Revise a mensagem e continue no WhatsApp para enviá-la.' : 'Prévia gerada. Envio desativado: este projeto demonstrativo ainda não possui um WhatsApp autorizado.';
  if (configured) { whatsapp.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`; whatsapp.hidden = false; }
  result.hidden = false;
});
document.getElementById('year').textContent = new Date().getFullYear();
