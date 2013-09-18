define(["jquery","underscore","mockup-patterns-base","mockup-patterns-select2","mockup-patterns-queryhelper"],function(a,b,c,d,e){"use strict";var f=c.extend({name:"relateditems",browsing:!1,currentPath:null,defaults:{ajaxvocabulary:null,width:"300px",multiple:!0,tokenSeparators:[","," "],separator:",",orderable:!0,cache:!0,closeOnSelect:!1,basePath:"/",searchText:"Search:",searchAllText:"entire site",homeText:"home",folderTypes:["Folder"],selectableTypes:null,attributes:["UID","Title","Type","path"],dropdownCssClass:"pat-relateditems-dropdown",maximumSelectionSize:-1,resultTemplate:'<div class="pat-relateditems-result pat-relateditems-type-<%= Type %> <% if (selected) { %>pat-active<% } %>">  <a href="#" class="pat-relateditems-result-select <% if (selectable) { %>selectable<% } %>">    <span class="pat-relateditems-result-title"><%= Title %></span>    <span class="pat-relateditems-result-path"><%= path %></span>  </a>  <span class="pat-relateditems-buttons">  <% if (folderish) { %>     <a class="pat-relateditems-result-browse" href="#" data-path="<%= path %>"></a>   <% } %> </span></div>',resultTemplateSelector:null,selectionTemplate:'<span class="pat-relateditems-item pat-relateditems-type-<%= Type %>"> <span class="pat-relateditems-item-title"><%= Title %></span> <span class="pat-relateditems-item-path"><%= path %></span></span>',selectionTemplateSelector:null,breadCrumbsTemplate:'<span><span class="pat-relateditems-path-label"><%= searchText %></span><a class="icon-home" href="/"></a><%= items %></span>',breadCrumbsTemplateSelector:null,breadCrumbTemplate:'/<a href="<%= path %>"><%= text %></a>',breadCrumbTemplateSelector:null,escapeMarkup:function(a){return a},setupAjax:function(){var b=this;return b.query=new e(b.$el,a.extend(!0,{},b.options,{basePattern:b})),b.query.valid?b.query.selectAjax():{}}},applyTemplate:function(c,d){var e,f=this;return f.options[c+"TemplateSelector"]?(e=a(f.options[c+"TemplateSelector"]).html(),e||(e=f.options[c+"Template"])):e=f.options[c+"Template"],b.template(e,d)},activateBrowsing:function(){var a=this;a.browsing=!0,a.setBreadCrumbs()},deactivateBrowsing:function(){var a=this;a.browsing=!1,a.setBreadCrumbs()},browseTo:function(a){var b=this;b.trigger("before-browse"),b.currentPath=a,"/"===a?b.deactivateBrowsing():b.activateBrowsing(),b.$el.select2("close"),b.$el.select2("open"),b.trigger("after-browse")},setBreadCrumbs:function(){var c,d=this,e=d.currentPath?d.currentPath:d.options.basePath;if("/"===e)c=d.applyTemplate("breadCrumbs",{items:"<em>"+d.options.searchAllText+"</em>",searchText:d.options.searchText});else{var f=e.split("/"),g="",h="";b.each(f,function(a){if(""!==a){var b={};g=g+"/"+a,b.text=a,b.path=g,h+=d.applyTemplate("breadCrumb",b)}}),c=d.applyTemplate("breadCrumbs",{items:h,searchText:d.options.searchText})}var i=a(c);a("a",i).on("click",function(){return d.browseTo(a(this).attr("href")),!1}),d.$browsePath.html(i)},selectItem:function(a){var b=this;b.trigger("selecting");var c=b.$el.select2("data");c.push(a),b.$el.select2("data",c),a.selected=!0,b.trigger("selected")},deselectItem:function(a){var c=this;c.trigger("deselecting");var d=c.$el.select2("data");b.each(d,function(b,c){b.UID===a.UID&&d.splice(c,1)}),c.$el.select2("data",d),a.selected=!1,c.trigger("deselected")},isSelectable:function(a){var c=this;return null===c.options.selectableTypes?!0:b.indexOf(c.options.selectableTypes,a.Type)>-1},init:function(){var c=this;c.options.ajax=c.options.setupAjax.apply(c),c.$el.wrap('<div class="pat-relateditems-container" />'),c.$container=c.$el.parents(".pat-relateditems-container"),c.$container.width(c.options.width),d.prototype.initializeValueMap.call(c),d.prototype.initializeTags.call(c),c.options.formatSelection=function(a){return c.applyTemplate("selection",a)},d.prototype.initializeOrdering.call(c),c.options.formatResult=function(d){if(d.folderish=d.Type&&-1!==b.indexOf(c.options.folderTypes,d.Type)?!0:!1,d.selectable=c.isSelectable(d),void 0===d.selected){var e=c.$el.select2("data");d.selected=!1,b.each(e,function(a){a.UID===d.UID&&(d.selected=!0)})}var f=a(c.applyTemplate("result",d));return a(".pat-relateditems-result-select",f).on("click",function(b){if(b.preventDefault(),a(this).is(".selectable")){var e=a(this).parents(".pat-relateditems-result");if(e.is(".pat-active"))e.removeClass("pat-active"),c.deselectItem(d);else if(c.selectItem(d),e.addClass("pat-active"),c.options.maximumSelectionSize>0){var f=c.$select2.select2("data");f.length>=c.options.maximumSelectionSize&&c.$select2.select2("close")}}}),a(".pat-relateditems-result-browse",f).on("click",function(b){b.preventDefault(),b.stopPropagation();var d=a(this).data("path");c.browseTo(d)}),a(f)},c.options.initSelection=function(b,d){var e=a(b).val();if(""!==e){var f=e.split(c.options.separator);c.query.search("UID","plone.app.querystring.operation.list.contains",f,function(a){d(a.results)},!1)}},c.options.id=function(a){return a.UID},d.prototype.initializeSelect2.call(c),{browseText:c.options.browseText,searchText:c.options.searchText},c.$browsePath=a('<span class="pat-relateditems-path" />'),c.$container.prepend(c.$browsePath),c.deactivateBrowsing(),c.$el.on("select2-selecting",function(a){a.preventDefault()})}});return f});