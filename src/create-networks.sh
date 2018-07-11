networks="datanet skitnet replynet authnet sitenet usernet follownet"

for net in $networks; do
    docker network create $net
done
