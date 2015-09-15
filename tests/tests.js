/* global describe it beforeEach afterEach */
var Inferno = require('../src/inferno');
var chai = require('chai');
var t7 = require('../examples/t7');
var isBrowser = require('../src/util/isBrowser');
var DOMOperations = require('../src/browser/template/DOMOperations');
var CSSOperations = require('../src/browser/template/CSSOperations');
var addAttributes = require('../src/browser/template/addAttributes');
var expect = chai.expect;
var setHtml = DOMOperations.setHtml;
var setStyles = CSSOperations.setStyles;

//expose t7 and Inferno globally
global.t7 = t7;
global.Inferno = Inferno;

describe('Inferno acceptance tests', function() {
	describe('Inferno.render()', function() {
		describe('DOM elements tests', function() {
			var container;

			beforeEach(function() {
				isBrowser.addBrowser();
				container = document.createElement('div');
			});

			afterEach(function() {
				Inferno.clearDomElement(container);
				container = null;
			});

			describe('using the Inferno functional API', function() {
				it('should render a basic example', function() {
					var template = Inferno.createTemplate(function(createElement) {
						return createElement('div', null, 'Hello world');
					});

					Inferno.render(
						Inferno.createFragment(null, template),
						container
					);

					var test = container.innerHTML;
					var expected = '<div>Hello world</div>';

					expect(test).to.equal(expected);
				});

				it('should render a basic example with dynamic values', function() {
					var template = Inferno.createTemplate(function(createElement, val1, val2) {
						return createElement('div', null, 'Hello world - ', val1, ' ', val2);
					});

					Inferno.render(
						Inferno.createFragment(['Inferno', 'Owns'], template),
						container
					);

					var test = container.innerHTML;
					var expected = '<div>Hello world - Inferno Owns</div>';

					expect(test).to.equal(expected);
				});

				it('should render a basic example with dynamic values and props', function() {
					var template = Inferno.createTemplate(function(createElement, val1, val2) {
						return createElement('div', {class: 'foo'},
							createElement('span', {class: 'bar'}, val1),
							createElement('span', {class: 'yar'}, val2)
						);
					});

					Inferno.render(
						Inferno.createFragment(['Inferno', 'Rocks'], template),
						container
					);

					var test = container.innerHTML;
					var expected = `<div class="foo"><span class="bar">Inferno</span><span class="yar">Rocks</span></div>`;

					expect(test).to.equal(expected);
				});
			});

			describe('using the Inferno t7 template API', function() {
				beforeEach(function() {
					t7.setOutput(t7.Outputs.Inferno);
				});

				it('should render a basic example', function() {
					Inferno.render(
						t7`<div>Hello world</div>`,
						container
					);

					var test = container.innerHTML;
					var expected = '<div>Hello world</div>';

					expect(test).to.equal(expected);
				});

				it('should render a basic example with dynamic values', function() {
					var val1 = 'Inferno';
					var val2 = 'Owns';

					Inferno.render(
						t7`<div>Hello world - ${ val1 } ${ val2 }</div>`,
						container
					);

					var test = container.innerHTML;
					var expected = '<div>Hello world - Inferno Owns</div>';

					expect(test).to.equal(expected);
				});

				it('should render a basic example with dynamic values and props', function() {
					var val1 = 'Inferno';
					var val2 = 'Rocks';

					Inferno.render(
						t7`<div class='foo'><span class='bar'>${ val1 }</span><span class='yar'>${ val2 }</span></div>`,
						container
					);

					var test = container.innerHTML;
					var expected = `<div class="foo"><span class="bar">Inferno</span><span class="yar">Rocks</span></div>`;

					expect(test).to.equal(expected);
				});

				it('should properly render input download attribute', function() {
					Inferno.render(
						t7`<input download=${ false } />`,
						container
					);

					var test = container.innerHTML;
					var expected = '<input>';

					expect(test).to.equal(expected);
				});
			});
		});

		describe('Virtual elements tests', function() {
			var container;

			beforeEach(function() {
				isBrowser.removeBrowser();
				container = Inferno.template.createElement('div', null, true);
			});

			afterEach(function() {
				container = null;
			});

			describe('using the Inferno functional API', function() {
				it('should render a basic example', function() {
					var template = Inferno.createTemplate(function(createElement) {
						return createElement('div', null, 'Hello world');
					});

					Inferno.render(
						Inferno.createFragment(null, template),
						container
					);

					var test = container.innerHTML;
					var expected = '<div>Hello world</div>';

					expect(test).to.equal(expected);
				});

				it('should render a basic example with dynamic values', function() {
					var template = Inferno.createTemplate(function(createElement, val1, val2) {
						return createElement('div', null, 'Hello world - ', val1, ' ', val2);
					});

					Inferno.render(
						Inferno.createFragment(['Inferno', 'Owns'], template),
						container
					);

					var test = container.innerHTML;
					var expected = '<div>Hello world - Inferno Owns</div>';

					expect(test).to.equal(expected);
				});

				it('should render a basic example with dynamic values and props', function() {
					var template = Inferno.createTemplate(function(createElement, val1, val2) {
						return createElement('div', {class: 'foo'},
							createElement('span', {class: 'bar'}, val1),
							createElement('span', {class: 'yar'}, val2)
						);
					});

					Inferno.render(
						Inferno.createFragment(['Inferno', 'Rocks'], template),
						container
					);

					var test = container.innerHTML;
					var expected = `<div class="foo"><span class="bar">Inferno</span><span class="yar">Rocks</span></div>`;

					expect(test).to.equal(expected);
				});
			});

			describe('using the Inferno t7 template API', function() {
				beforeEach(function() {
					t7.setOutput(t7.Outputs.Inferno);
				});

				it('should render a basic example', function() {
					Inferno.render(
						t7`<div>Hello world</div>`,
						container
					);

					var test = container.innerHTML;
					var expected = '<div>Hello world</div>';

					expect(test).to.equal(expected);
				});

				it('should render a basic example with dynamic values', function() {
					var val1 = 'Inferno';
					var val2 = 'Owns';

					Inferno.render(
						t7`<div>Hello world - ${ val1 } ${ val2 }</div>`,
						container
					);

					var test = container.innerHTML;
					var expected = '<div>Hello world - Inferno Owns</div>';

					expect(test).to.equal(expected);
				});

				it('should render a basic example with dynamic values and props', function() {
					var val1 = 'Inferno';
					var val2 = 'Rocks';

					Inferno.render(
						t7`<div class='foo'><span class='bar'>${ val1 }</span><span class='yar'>${ val2 }</span></div>`,
						container
					);

					var test = container.innerHTML;
					var expected = `<div class="foo"><span class="bar">Inferno</span><span class="yar">Rocks</span></div>`;

					expect(test).to.equal(expected);
				});
			});
		});
	});

	describe('Inferno.renderToString()', function() {
		describe('DOM elements tests', function() {
			var container;

			beforeEach(function() {
				isBrowser.addBrowser();
				container = document.createElement('div');
			});

			afterEach(function() {
				Inferno.clearDomElement(container);
				container = null;
			});

			describe('using the Inferno functional API', function() {
				it('should render a basic example', function() {
					var template = Inferno.createTemplate(function(createElement) {
						return createElement('div', null, 'Hello world');
					});

					var test = Inferno.renderToString(
						Inferno.createFragment(null, template)
					);

					var expected = '<div>Hello world</div>';

					expect(test).to.equal(expected);
				});

				it('should render a basic example with dynamic values', function() {
					var template = Inferno.createTemplate(function(createElement, val1, val2) {
						return createElement('div', null, 'Hello world - ', val1, ' ', val2);
					});

					var test = Inferno.renderToString(
						Inferno.createFragment(['Inferno', 'Owns'], template)
					);

					var expected = '<div>Hello world - Inferno Owns</div>';

					expect(test).to.equal(expected);
				});

				it('should render a basic example with dynamic values and props', function() {
					var template = Inferno.createTemplate(function(createElement, val1, val2) {
						return createElement('div', {class: 'foo'},
							createElement('span', {class: 'bar'}, val1),
							createElement('span', {class: 'yar'}, val2)
						);
					});

					var test = Inferno.renderToString(
						Inferno.createFragment(['Inferno', 'Rocks'], template)
					);

					var expected = `<div class="foo"><span class="bar">Inferno</span><span class="yar">Rocks</span></div>`;

					expect(test).to.equal(expected);
				});
			});

			describe('using the Inferno t7 template API', function() {
				beforeEach(function() {
					t7.setOutput(t7.Outputs.Inferno);
				});

				it('should render a basic example', function() {
					var test = Inferno.renderToString(
						t7`<div>Hello world</div>`
					);

					var expected = '<div>Hello world</div>';

					expect(test).to.equal(expected);
				});

				it('should render a basic example with dynamic values', function() {
					var val1 = 'Inferno';
					var val2 = 'Owns';

					var test = Inferno.renderToString(
						t7`<div>Hello world - ${ val1 } ${ val2 }</div>`
					);

					var expected = '<div>Hello world - Inferno Owns</div>';

					expect(test).to.equal(expected);
				});

				it('should render a basic example with dynamic values and props', function() {
					var val1 = 'Inferno';
					var val2 = 'Rocks';

					var test = Inferno.renderToString(
						t7`<div class='foo'><span class='bar'>${ val1 }</span><span class='yar'>${ val2 }</span></div>`
					);

					var expected = `<div class="foo"><span class="bar">Inferno</span><span class="yar">Rocks</span></div>`;

					expect(test).to.equal(expected);
				});
			});
		});

		describe('Virtual elements tests', function() {
			var container;

			beforeEach(function() {
				isBrowser.removeBrowser();
				container = Inferno.template.createElement('div', null, true);
			});

			afterEach(function() {
				container = null;
			});

			describe('using the Inferno functional API', function() {
				it('should render a basic example', function() {
					var template = Inferno.createTemplate(function(createElement) {
						return createElement('div', null, 'Hello world');
					});

					var test = Inferno.renderToString(
						Inferno.createFragment(null, template)
					);

					var expected = '<div>Hello world</div>';

					expect(test).to.equal(expected);
				});

				it('should render a basic example with dynamic values', function() {
					var template = Inferno.createTemplate(function(createElement, val1, val2) {
						return createElement('div', null, 'Hello world - ', val1, ' ', val2);
					});

					var test = Inferno.renderToString(
						Inferno.createFragment(['Inferno', 'Owns'], template)
					);

					var expected = '<div>Hello world - Inferno Owns</div>';

					expect(test).to.equal(expected);
				});

				it('should render a basic example with dynamic values and props', function() {
					var template = Inferno.createTemplate(function(createElement, val1, val2) {
						return createElement('div', {class: 'foo'},
							createElement('span', {class: 'bar'}, val1),
							createElement('span', {class: 'yar'}, val2)
						);
					});

					var test = Inferno.renderToString(
						Inferno.createFragment(['Inferno', 'Rocks'], template)
					);

					var expected = `<div class="foo"><span class="bar">Inferno</span><span class="yar">Rocks</span></div>`;

					expect(test).to.equal(expected);
				});
			});
		});

		describe('using the Inferno t7 template API', function() {
			beforeEach(function() {
				t7.setOutput(t7.Outputs.Inferno);
			});

			it('should render a basic example', function() {
				var test = Inferno.renderToString(
					t7`<div>Hello world</div>`
				);

				var expected = '<div>Hello world</div>';

				expect(test).to.equal(expected);
			});

			it('should render a basic example with dynamic values', function() {
				var val1 = 'Inferno';
				var val2 = 'Owns';

				var test = Inferno.renderToString(
					t7`<div>Hello world - ${ val1 } ${ val2 }</div>`
				);

				var expected = '<div>Hello world - Inferno Owns</div>';

				expect(test).to.equal(expected);
			});

			it('should render a basic example with dynamic values and props', function() {
				var val1 = 'Inferno';
				var val2 = 'Rocks';

				var test = Inferno.renderToString(
					t7`<div class='foo'><span class='bar'>${ val1 }</span><span class='yar'>${ val2 }</span></div>`
				);

				var expected = `<div class="foo"><span class="bar">Inferno</span><span class="yar">Rocks</span></div>`;

				expect(test).to.equal(expected);
			});
		});
	});

	describe('DOM operations', function() {
  	  
	  var container;

	beforeEach(function() {
	    container = document.createElement('div');
	});

   describe('.setHtml()', function() {
	it("should render 'checked' as a property", function () {
	    setHtml(container, "checked", true);
	    expect(container.checked).to.equal(true);
	});

	it("should support custom attributes", function () {
	    setHtml(container,  "custom-attr", 123);
	   expect( container.getAttribute( "custom-attr" ) ).to.equal( "123" );
	});

	it("shouldn\'t render null values", function () {
	    setHtml(container,  "value", null);
        expect( container.value ).to.be.undefined;
	});

//	it("should set a 'id' attribute", function () {
//	    setHtml(container,  "custom-attr", 123)
//	    expect( container.id).to.equal( "foo" );
		
	//});

	it("should set 'title' attribute", function () {
	    setHtml(container,  "title", "dominic");
	    expect( container.getAttribute( "title" ) ).to.equal( "dominic" );
		
	});

	it("should support HTML5 data-* attribute", function () {
	    setHtml(container, "data-foo", "bar");
	    expect( container.getAttribute( "data-foo") ).to.equal( "bar" );
		
	});

	it("should handle checkbox", function () {
	    setHtml(container, "data-foo", "bar");
	    expect( container.getAttribute( "data-foo") ).to.equal( "bar" );
		
	});

});

        describe('.addAttributes()', function() {

    it( "should handle radio buttons", function () {
	    
		addAttributes(container, { type: "radio", checked: true });
        expect( container.getAttribute( "type" ) ).to.eql( "radio" );
        expect( container.checked ).to.be.true;

    });
	
	it( "should set the 'title' attribute", function () {

		addAttributes(container, { title: "FooBar" });
        expect( container.getAttribute( "title" ) ).to.eql( "FooBar" );

    } );
	 
    it( "should handle empty attributes", function () {
        addAttributes(container, {});
        expect( container.attrs ).to.be.undefined;
    } );
	
	 it( "should ignore a `undefined` attribute", function () {

        addAttributes(container, { "class": undefined })
        expect( container.hasAttribute( "class" ) ).to.be.false;

    } );

    it( "should ignore a `undefined` value attribute", function () {
        addAttributes(container, { "value": undefined });
        expect( "value" in container ).to.be.false;
        expect( container.hasAttribute( "value" ) ).to.be.false;

    } );
	
	 it( "should set 'selectedIndex' property as an attribute", function () {
        addAttributes(container, { type: "option", selectedIndex: true });
        expect( container.getAttribute( "type" ) ).to.eql( "option");

    } );

    it( "should set 'selected' boolean attribute", function () {
        addAttributes(container, { type: "radio", selected: true });
        expect( container.getAttribute( "type" ) ).to.eql( "radio" );
        expect( container.selected ).to.be.true;

    } );

    it( "should set 'selected' boolean attribute as selected", function () {
        addAttributes(container, { type: "radio", selected: "selected" });
        expect( container.getAttribute( "type" ) ).to.eql( "radio" );
        expect( container.selected ).to.eql("selected");

    } );
	 
    it( "should set 'checked' boolean attribute", function () {

        addAttributes(container, { type: "checkbox", checked: true });
        expect( container.getAttribute( "type" ) ).to.eql( "checkbox" );
       expect( container.checked ).to.be.true;

    } );

   it( "should set 'checked' boolean attribute as checked", function () {
      addAttributes(container, { type: "checkbox", checked: "checked"});
      expect( container.getAttribute( "type" ) ).to.eql( "checkbox" );
      expect( container.checked).to.eql( "checked" );

    } );

    it( "should set 'disabled' boolean attribute as disabled", function () {
        
		addAttributes(container, { type: "radio", disabled: "disabled" } );
        expect( container.getAttribute( "type" ) ).to.eql( "radio" );
        expect( container.getAttribute("disabled") ).to.eql( "" );

    } );

    it( "should set 'open' attribute", function () {
        addAttributes(container, { open: "open" } );
        expect( container.open ).to.eql( "open" );
    } );	

    it( "should set 'contenteditable' attribute", function () {
        addAttributes(container, { contenteditable: true  } );
        expect( container.getAttribute( "contenteditable" ) ).to.eql( "true" );

    } );	

    it( "should set 'maxlength' attribute", function () {
        addAttributes(container, { maxlength: "5" } );
        expect( container.getAttribute( "maxlength" ) ).to.eql( "5" );

    } );	

    it( "should set 'aria-disabled' attribute", function () {
        addAttributes(container, { "aria-disabled": false } );
        expect( container.getAttribute( "aria-disabled" ) ).to.eql( "false" );
    });		
	
	it( "should set 'required' attribute", function () {
        addAttributes(container,  { required: "required" } );
        expect( container.required ).to.eql( "required" );

    } );	

    it( "should set 'required' attribute to false", function () {

        addAttributes(container, { required: false } );
        expect( container.required ).to.be.false;
    } );	
	
	it( "should set 'autofocus' attribute", function () {
        addAttributes(container,  { autofocus: "autofocus" } );
        expect( container.getAttribute("autofocus") ).to.eql( "autofocus" );

    } );	

    it( "should set 'autofocus' attribute to false", function () {

        addAttributes(container, { required: false } );
        expect( container.getAttribute("autofocus" )).to.be.null;
    } );	
	
	 it( "should unsert 'multiple' attribute", function () {
         addAttributes(container, { multiple: undefined } );
         expect( container.getAttribute( "multiple" ) ).to.be.null;
         expect( container.multiple ).to.be.undefined;
    });
	
	it( "should set the 'name' attribute and treat it as a property", function () {
         addAttributes(container, { name: "simple" } );
         expect( container.name ).to.eql("simple");

    });

	it( "should set the 'name' attribute to 'false'", function () {
         addAttributes(container, { name: "false" } );
         expect( container.name ).to.eql("false");

    });

	it( "should unset the 'name' attribute to 'null'", function () {
         addAttributes(container, { name: null } );
         expect( container.name ).to.be.undefined;

    });

	it( "should work with the id attribute", function () {
         addAttributes(container, { id: "simple" } );
         expect( container.id ).to.eql("simple");

    });

	it( "should create markup for boolean properties", function () {
         addAttributes(container, { checked: "checked" } );
         expect( container.checked ).to.eql("checked");

         addAttributes(container, { checked: "checked" } );
         expect( container.checked ).to.eql("checked");

         addAttributes(container, { checked: false } );
         expect( container.checked ).to.be.false;

         addAttributes(container, { scoped: true } );
         expect( container.scoped ).to.be.true;

    });

	it( "should create markup for booleanish properties", function () {
         addAttributes(container, { download: "simple" } );
         expect( container.download ).to.eql("simple");

         addAttributes(container, { download: true } );
         expect( container.download ).to.eql(true);

         addAttributes(container, { download: "true" } );
         expect( container.download ).to.eql("true");

    });

    it( "should handle numeric properties", function () {
         addAttributes(container, { start: 5 } );
         expect( container.start ).to.eql(5);

         addAttributes(container, { start: 0 } );
         expect( container.start ).to.eql(0);

         addAttributes(container, { size: 0 } );
         expect( container.getAttribute("size") ).to.eql("0");

    });
	it( "should set className to empty string instead of null", function () {
        addAttributes(container, { className: null } );
        expect( container.className ).to.eql("");

    });

	
  });

	});
   
   describe('CSS operations', function() {
  	  
	  var container;

	beforeEach(function() {
	    container = document.createElement('div');
	});

     describe('.setStyles()', function() {
		 	it( "should create markup for simple styles", function () {
        addAttributes(container, { display: "none" } );
        expect( container.style.display ).to.eql( "" );
    });

	 
		 });


	});
	
	
	
	
	
});