.DEFAULT_GOAL := list

list:
	@printf "%-20s %s\n" "Target" "Description"
	@printf "%-20s %s\n" "------" "-----------"
	@make -pqR : 2>/dev/null \
			| awk -v RS= -F: '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' \
			| sort \
			| egrep -v -e '^[^[:alnum:]]' -e '^$@$$' \
			| xargs -I _ sh -c 'printf "%-20s " _; make _ -nB | (grep -i "^# Help:" || echo "") | tail -1 | sed "s/^# Help: //g"'
install:
	@# Help: Install dependencies
	@pnpm install
update:
	@# Help: Update dependencies
	@pnpm update
clean:
	@# Help: Clear dependencies
	@rm -rf ./node_modules
run:
	@# Help: Run server
	@pnpm run dev
