#! python3

import json
from json import encoder
import pprint
import yaml
import argparse

foo = "foo bar"

parser = argparse.ArgumentParser()
parser.add_argument('input')
parser.add_argument('output')
parser.add_argument('-method', choices=['yaml2json', 'pson2json', 'json2pson', 'json2yaml'])
args = parser.parse_args()

with open(args.input, encoding='utf-8') as file:
    text = file.read()

if args.method == 'yaml2json':
    data = yaml.load(text, Loader=yaml.Loader)
    text = json.dumps(data, indent=4)
elif args.method == 'pson2json':
    data = eval(text)
    #lol
    text = json.dumps(data, indent=4)
elif args.method == 'json2pson':
    data = json.loads(text)
    text = pprint.pformat(data, indent=4)
elif args.method == 'json2yaml':
    data = json.loads(text)
    text = yaml.dump(data)


with open(args.output, 'w', encoding='utf-8') as file:
    file.write(text)
