bash:
	@docker-compose exec backend bash

shell:
	@docker-compose exec backend bash -c "python manage.py shell_plus"

reqs:
	@docker-compose exec backend bash -c "pip install -r requirements.txt"

load_blocks:
	@docker-compose exec backend bash -c "python manage.py loaddata blocks"

dump_blocks:
	@docker-compose exec backend bash -c "python manage.py dumpdata promotions --indent=4 > blocks.json"

install_docker:
	@sh get-docker.sh
	@sudo apt-get install -y docker-compose

rebuild_docker:
	@ansible-playbook -vv -u ubuntu -i  '$(ip),' -e '{ target: $(ip) }' --private-key $(private_key) ../ansible/rebuild.yml

update_code:
	@git pull
	@docker-compose stop
	@docker-compose up -d

resetdb:
	@echo "Creating an empty database"
	@docker-compose rm -sf postgres
	@docker-compose up -d postgres

create_superuser:
	@./shell_inside_docker.sh "./manage.py createsuperuser"
