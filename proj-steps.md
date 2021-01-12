#create project
ng smart-champs
cd smart-champs

#Install bootstrap
npm install --save bootstrap jquery

#add project specific code
#https://www.smashingmagazine.com/2019/02/angular-application-bootstrap/
#https://bootsnipp.com/snippets/z8aQr
#https://bootsnipp.com/tags/login/4
#https://www.smashingmagazine.com/2019/02/angular-application-bootstrap/

#ng cmds
ng g m [ModuleName] --routing
ng g c [ComponentName]
ng generate module orders --route orders --module app.module

ng g m modules/login/login --routing --flat
ng g c login --flat

#save and deploy to git
git remote add origin https://github.com/akshaydongaregit/smart-champs.git
npm install -g angular-cli-ghpages
ng build --prod --base-href https://akshaydongaregit.github.io/smart-champs/

ng add ngx-bootstrap  --component dropdowns

#https://valor-software.com/ngx-bootstrap/#/dropdowns
#https://medium.com/aubergine-solutions/bootstrap-dropdown-as-formcontrol-in-angular-62fe15f0eec

#02-Sep
#https://codeburst.io/how-to-create-shared-components-in-angular-template-driven-and-reactive-form-ddb095cc7904
#https://medium.com/@liutingchun_95744/angular-four-practical-tips-to-build-a-good-shared-component-63034aa2027

#02-Sep
https://angular-templates.io/tutorials/about/angular-forms-and-validations

mysql -h  -u smartChampsDev -p 

smartfuture
Naik2017Champs