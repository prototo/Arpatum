import yaml
from os.path import dirname, join

class Schema:
    base_path = ''
    schema = {}

    def __init__(self, config='schema.yml'):
        self.schema_location = join(dirname(__file__), config)
        self.load_schema()

    def __getattr__(self, item):
        return self.get_schema(item)

    def load_schema(self):
        with open(self.schema_location) as f:
            self.schema = yaml.load(f.read())
        self.base_path = self.schema.get('basepath', '')
        return self.schema

    def get_schema(self, signature):
        parts = signature.lower().split('_')
        schema = self.load_schema()['routes']
        path = self.base_path

        for part in parts:
            schema = schema.get(part, None)

            # add any additional path sections
            if 'path' in schema:
                path = '/'.join((path, schema.get('path')))

            # fall into routes blocks
            if 'routes' in schema:
                schema = schema.get('routes')

            if not schema:
                return False

        schema['path'] = path
        return schema

