PROTOC_GEN_TS_PATH := ./node_modules/.bin/protoc-gen-ts

PROTO_PATH := ./proto
OUT_DIR := ./src/generated

generate-js:
	rm -rf $(OUT_DIR)/*
	protoc \
		--plugin='protoc-gen-ts=$(PROTOC_GEN_TS_PATH)' \
		--js_out='import_style=commonjs,binary:$(OUT_DIR)' \
		--ts_out='$(OUT_DIR)' \
		--proto_path='$(PROTO_PATH)' \
		$(PROTO_PATH)/query.proto
