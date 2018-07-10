networks="datanet skitnet replynet authnet sitenet usernet"

for net in $networks; do
    docker network create $net
done
