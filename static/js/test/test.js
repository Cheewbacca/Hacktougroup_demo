"use strict";

QUnit.test("should show alternative menu", function (assert) {
  var burger = $('#burger');
  burger.click();
  assert.ok($('.header__navigation-opened').hasClass('hidded'), true, "It has the class!");
});