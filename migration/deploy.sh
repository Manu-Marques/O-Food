
export POSTGRES_USER=ofood
export POSTGRES_PASSWORD=ofoodpassword
export POSTGRES_DB=ofood

sqitch init ofood --engine pg 

#sqitch target add docker postgres://ofood:ofoodpassword@localhost:54320/ofood

# cde d'ajout d'une cible distante
#sqitch target add <name> <uri> [-s <property>=<value> ...]

# sqitch target add heroku postgres://yxsrdlueuhgwkf:2d07622db070a1d23ff4919ff475f15de5545267420fcf539dc8c79afe448989@ec2-176-34-211-0.eu-west-1.compute.amazonaws.com:5432/da38rkuk5g2fa5

sqitch add 1.init -n "structure projet"
sqitch add 2.add.seeding -n "add.seeding"
sqitch add 3.add.script_create_meals -n "3.add.script_create_meals"
sqitch add 4.add.script_create_meals_version_2 -n "4.add.script_create_meals_version_2 "
sqitch add 5.add.script_create_meals_version_3 -n "5.add.script_create_meals_version_3 "
sqitch add 6.add.script_recipesBy_IntolerancesAnd_Imc -n "6.add.script_recipesBy_IntolerancesAnd_Imc"


# je revert
#sqitch revert db:pg:mydb
sqitch revert docker
#sqitch revert heroku

# je deploy
#sqitch deploy db:pg:mydb
#
#
#sqitch deploy docker 4.add.script_create_meals_version_2
sqitch deploy docker



#sqitch deploy heroku
# sqitch deploy heroku 2.add.seeding
# sqitch revert heroku 1.init


# je verify Attention on ne vérifie que le dernier état de deploy
#sqitch verify db:pg:mydb 1.init





