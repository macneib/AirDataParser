
shopt -s globstar; sed -i.bak 's/^{"data"://' *.json

sed -i.bak 's/}\]}$/}]/' *.json

sed -i.bak 's/[^]]$/&]/' *.json