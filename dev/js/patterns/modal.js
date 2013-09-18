define(["jquery","underscore","mockup-patterns-base","mockup-patterns-backdrop","mockup-registry","jquery.form"],function(a,b,c,d,e){"use strict";var f=c.extend({name:"modal",createModal:null,$model:null,defaults:{width:"",height:"",margin:function(){return 20},position:"center middle",triggers:[],backdrop:"body",backdropOptions:{zIndex:"1040",opacity:"0.8",className:"backdrop",classActiveName:"backdrop-active",closeOnEsc:!0,closeOnClick:!0},title:null,titleSelector:"h1:first",buttons:'.formControls > input[type="submit"]',content:"#content",automaticallyAddButtonActions:!0,loadLinksWithinModal:!0,prependContent:".portalMessage",templateOptions:{className:"modal",classHeaderName:"modal-header",classBodyName:"modal-body",classFooterName:"modal-footer",classWrapperName:"modal-wrapper",classWrapperInnerName:"modal-wrapper-inner",classLoadingName:"modal-loading",classActiveName:"active",classPrependName:"",classContentName:"",template:'<div class="<%= options.className %>">  <div class="<%= options.classHeaderName %>">    <a class="close">&times;</a>    <% if (title) { %><h3><%= title %></h3><% } %>  </div>  <div class="<%= options.classBodyName %>">    <div class="<%= options.classPrependName %>"><%= prepend %></div>     <div class="<%= options.classContentName %>"><%= content %></div>  </div>  <div class="<%= options.classFooterName %>">     <%= buttons %>   </div></div>'},actions:{},actionOptions:{eventType:"click",target:null,ajaxUrl:null,modalFunction:null,isForm:!1,timeout:5e3,displayInModal:!0,reloadWindowOnClose:!0,error:".portalMessage.error",loading:'<div class="progress progress-striped active">  <div class="bar" style="width: 100%;"></div></div>',onSuccess:null,onError:null,onFormError:null,onTimeout:null,redirectOnResponse:!1,redirectToUrl:function(b,c){var d=a(/<base.*?(\/>|<\/base>)/im.exec(c)[0]);return d.attr("href")}},form:function(c){var d=this,e=d.$modal;d.options.automaticallyAddButtonActions&&(c[d.options.buttons]={}),d.options.loadLinksWithinModal&&(c.a={}),a.each(c,function(c,f){var g=b.union(b.keys(d.options.actionOptions),["templateOptions"]),h=a.extend(!0,b.pick(f,g),d.options.actionOptions);f.templateOptions=a.extend(!0,f.templateOptions,d.options.templateOptions);var i=b.union(b.keys(d.options.actionOptions),["actions","actionOptions"]),j=a.extend(!0,b.omit(f,i),d.options);a(c,a("."+f.templateOptions.classBodyName,e)).each(function(){var b=a(this);b.on(h.eventType,function(c){c.stopPropagation(),c.preventDefault(),d.showLoading(!1),null!==h.modalFunction?d[h.modalFunction]():a.nodeName(b[0],"input")||a.nodeName(b[0],"button")||f.isForm===!0?d.options.handleFormAction.apply(d,[b,h,j]):(null!==f.ajaxUrl||a.nodeName(b[0],"a"))&&d.options.handleLinkAction.apply(d,[b,h,j])})})})},handleFormAction:function(b,c,d){var e=this,f={};f[b.attr("name")]=b.attr("value");var g;g=a.nodeName(b[0],"form")?b:b.parents("form:not(.disableAutoSubmit)");var h;h=null!==c.ajaxUrl?"function"==typeof c.ajaxUrl?c.ajaxUrl.apply(e,[b,c]):c.ajaxUrl:b.parents("form").attr("action"),g.on("submit",function(a){a.preventDefault()}),g.trigger("submit"),g.ajaxSubmit({timeout:c.timeout,data:f,url:h,error:function(a,b,d){"timeout"===b&&c.onTimeout?c.onTimeout.apply(e,a,d):c.onError?c.onError(a,b,d):console.log("error happened do something"),e.trigger("formActionError",[a,b,d])},success:function(f,g,h,i){return 0!==a(c.error,f).size()?(c.onFormError?c.onFormError(e,f,g,h,i):e.redraw(f,d),void 0):(c.redirectOnResponse===!0&&(window.parent.location.href="function"==typeof c.redirectToUrl?c.redirectToUrl.apply(e,[b,f,c]):c.redirectToUrl),c.onSuccess&&c.onSuccess(e,f,g,h,i),c.displayInModal===!0?e.redraw(f,d):(b.trigger("destroy.modal.patterns"),c.reloadWindowOnClose?e.reloadWindow():e.hide()),e.trigger("formActionSuccess",[f,g,h,i]),void 0)}})},handleLinkAction:function(b,c,d){var e,f=this;return e=c.ajaxUrl?"function"==typeof c.ajaxUrl?c.ajaxUrl.apply(f,[b,c]):c.ajaxUrl:b.attr("href"),c.displayInModal===!1?(window.parent.location.href=e,void 0):(a.ajax({url:e,error:function(a,b,d){"timeout"===b&&c.onTimeout?c.onTimeout(f.$modal,a,d):c.onError?c.onError(a,b,d):console.log("error happened do something"),f.$loading.hide(),f.trigger("linkActionError",[a,b,d])},success:function(a,b,e){f.redraw(a,d),c.onSuccess&&c.onSuccess(f,a,b,e),f.$loading.hide(),f.trigger("linkActionSuccess",[a,b,e])}}),void 0)},render:function(c){var d=this;if(d.trigger("before-render"),d.$raw){var e=d.$raw.clone(),f={title:"",prepend:"<div />",content:"",buttons:'<div class="pat-modal-buttons"></div>',options:c.templateOptions};if(null===c.title){var g=a(c.titleSelector,e);f.title=g.html(),a(c.titleSelector,e).remove()}else f.title=c.title;c.prependContent&&(f.prepend=a("<div />").append(a(c.prependContent,e).clone()).html(),a(c.prependContent,e).remove()),f.content=c.content?a(c.content,e).html():e.html(),d.$modal=a(b.template(d.options.templateOptions.template,f)),a(c.buttons,d.$modal).each(function(){var b=a(this);b.on("click",function(a){a.stopPropagation(),a.preventDefault()}).clone().appendTo(a(".pat-modal-buttons",d.$modal)).off("click").on("click",function(a){a.stopPropagation(),a.preventDefault(),b.trigger("click")}),b.hide()}),d.trigger("before-events-setup"),a(".modal-header > a.close",d.$modal).off("click").on("click",function(b){b.stopPropagation(),b.preventDefault(),a(b.target).trigger("destroy.modal.patterns")}),a(".row",d.$modal).removeClass("row"),c.form&&c.form.apply(d,[c.actions]),d.$modal.addClass(d.options.templateOptions.className).on("click",function(b){b.stopPropagation(),a.nodeName(b.target,"a")&&b.preventDefault()}).on("destroy.modal.patterns",function(a){a.stopPropagation(),d.hide()}).on("resize.modal.patterns",function(a){a.stopPropagation(),a.preventDefault(),d.positionModal()}).appendTo(d.$wrapperInner),d.$modal.data("pattern-"+d.name,d),d.trigger("after-render")}}},reloadWindow:function(){window.parent.location.reload()},init:function(){var b=this;b.backdrop=new d(b.$el.parents(b.options.backdrop),b.options.backdropOptions),b.$wrapper=a("> ."+b.options.templateOptions.classWrapperName,b.backdrop.$el),0===b.$wrapper.size()&&(b.$wrapper=a("<div/>").hide().css({"z-index":parseInt(b.options.backdropOptions.zIndex,10)+1,"overflow-y":"auto",position:"fixed",height:"100%",width:"100%",bottom:"0",left:"0",right:"0",top:"0"}).addClass(b.options.templateOptions.classWrapperName).insertBefore(b.backdrop.$backdrop).on("click",function(a){a.stopPropagation(),a.preventDefault(),b.options.backdropOptions.closeOnClick&&b.backdrop.hide()})),b.backdrop.on("hidden",function(){void 0!==b.$modal&&b.$modal.hasClass(b.options.templateOptions.classActiveName)&&b.hide()}),b.options.backdropOptions.closeOnEsc===!0&&a(document).on("keydown",function(a){b.$el.is("."+b.options.templateOptions.classActiveName)&&27===a.keyCode&&b.hide()}),b.$wrapperInner=a("> ."+b.options.templateOptions.classWrapperInnerName,b.$wrapper),0===b.$wrapperInner.size()&&(b.$wrapperInner=a("<div/>").addClass(b.options.classWrapperInnerName).css({position:"absolute",bottom:"0",left:"0",right:"0",top:"0"}).appendTo(b.$wrapper)),b.$loading=a("> ."+b.options.templateOptions.classLoadingName,b.$wrapperInner),0===b.$loading.size()&&(b.$loading=a("<div/>").hide().addClass(b.options.templateOptions.classLoadingName).appendTo(b.$wrapperInner)),a(window.parent).resize(function(){b.positionModal()}),b.options.triggers&&a.each(b.options.triggers,function(c,d){var e=d.substring(0,d.indexOf(" ")),f=d.substring(d.indexOf(" "),d.length);a(f||b.$el).on(e,function(a){a.stopPropagation(),a.preventDefault(),b.show()})}),b.$el.is("a")&&(b.$el.attr("href")&&(b.options.target||"#"!==b.$el.attr("href").substr(0,1)||(b.options.target=b.$el.attr("href"),b.options.content=""),b.options.ajaxUrl||"#"===b.$el.attr("href").substr(0,1)||(b.options.ajaxUrl=b.$el.attr("href"))),b.$el.on("click",function(a){a.stopPropagation(),a.preventDefault(),b.show()})),b.initModal()},showLoading:function(a){var b=this;void 0===a&&(a=!0),b.backdrop.closeOnClick=a,b.backdrop.closeOnEsc=a,b.backdrop.init(),b.$wrapper.parent().css("overflow","hidden"),b.$wrapper.show(),b.backdrop.show(),b.$loading.show(),b.positionLoading()},createAjaxModal:function(){var b=this;b.trigger("before-ajax"),b.showLoading(),b.ajaxXHR=a.ajax({url:b.options.ajaxUrl,type:b.options.ajaxType}).done(function(c,d,e){b.ajaxXHR=void 0,b.$loading.hide(),b.$raw=a("<div />").append(a(a(/<body[^>]*>((.|[\n\r])*)<\/body>/im.exec(c)[0].replace("<body","<div").replace("</body>","</div>"))[0])),b.trigger("after-ajax",b,d,e),b._show()})},createTargetModal:function(){var b=this;b.$raw=a(b.options.target).clone(),b._show()},createBasicModal:function(){var b=this;b.$raw=a("<div/>").html(b.$el.clone()),b._show()},createHtmlModal:function(){var b=this,c=a(b.options.html);b.$raw=c,b._show()},initModal:function(){var a=this;a.createModal=a.options.ajaxUrl?a.createAjaxModal:a.options.target?a.createTargetModal:a.options.html?a.createHtmlModal:a.createBasicModal},positionLoading:function(){var a=this;a.$loading.css({"margin-left":a.$wrapper.width()/2-a.$loading.width()/2,"margin-top":a.$wrapper.height()/2-a.$loading.height()/2,position:"absolute",bottom:"0",left:"0",right:"0",top:"0"})},findPosition:function(a,b,c,d,e,f,g){var h,i,j,k,l={};return k=j=h=j="auto","left"===a?(j=c+"px",d>f&&(j="0px"),l.left=j):"right"===a?(k=c+"px",d>f&&(k="0px"),l.right=k,l.left="auto"):(j=f/2-d/2-c+"px",d>f&&(j="0px"),l.left=j),"top"===b?(h=c+"px",e>g&&(h="0px"),l.top=h):"bottom"===b?(i=c+"px",e>g&&(i="0px"),l.bottom=i,l.top="auto"):(h=g/2-e/2-c+"px",e>g&&(h="0px"),l.top=h),l},positionModal:function(){var b=this;if(null!==b.$modal&&void 0!==b.$modal){b.$modal.removeAttr("style"),b.$wrapper.parent().is("body")&&b.$wrapper.height(a(window.parent).height());var c="function"==typeof b.options.margin?b.options.margin():b.options.margin;b.$modal.css({padding:"0",margin:c,width:b.options.width,height:b.options.height,position:"absolute"});var d=b.options.position.split(" "),e=d[0],f=d[1],g=b.$modal.outerWidth(!0),h=b.$modal.outerHeight(!0),i=b.$wrapperInner.width(),j=b.$wrapperInner.height(),k=b.findPosition(e,f,c,g,h,i,j);for(var l in k)b.$modal.css(l,k[l])}},render:function(a){var b=this;b.trigger("render"),b.options.render.apply(b,[a]),b.trigger("rendered")},show:function(){var a=this;a.createModal()},_show:function(){var b=this;b.render.apply(b,[b.options]),b.trigger("show"),b.backdrop.show(),b.$wrapper.show(),b.$loading.hide(),b.$wrapper.parent().css("overflow","hidden"),b.$el.addClass(b.options.templateOptions.classActiveName),b.$modal.addClass(b.options.templateOptions.classActiveName),e.scan(b.$modal),b.positionModal(),a("img",b.$modal).load(function(){b.positionModal()}),a(window.parent).on("resize.modal.patterns",function(){b.positionModal()}),b.trigger("shown")},hide:function(){var b=this;b.ajaxXHR&&b.ajaxXHR.abort(),b.trigger("hide"),a(".modal",b.$wrapper).size()<2&&(b.backdrop.hide(),b.$wrapper.hide(),b.$loading.hide(),b.$wrapper.parent().css("overflow","visible")),b.$el.removeClass(b.options.templateOptions.classActiveName),void 0!==b.$modal&&(b.$modal.remove(),b.initModal()),a(window.parent).off("resize.modal.patterns"),b.trigger("hidden")},redraw:function(b,c){var d=this;d.trigger("beforeDraw"),d.$modal.remove(),d.$raw=a("<div />").append(a(a(/<body[^>]*>((.|[\n\r])*)<\/body>/im.exec(b)[0].replace("<body","<div").replace("</body>","</div>"))[0])),d.render.apply(d,[c]),d.positionModal(),e.scan(d.$modal),d.trigger("afterDraw")}});return f});