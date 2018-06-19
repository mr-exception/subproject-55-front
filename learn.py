import real
import numpy as np
import main

def add_experience(param, target, acceped='1'):
    data_file = open("data.txt", "a+")
    data_file.write('{}:{}:{}\n'.format(int(param,2), target, acceped))
    data_file.close()

print('Learning script started')
while True:
    param = input('enter the parameter ({} bits): '.format(real.input_size))
    while len(param) != real.input_size:
        param = input('enter the input in {} bits: '.format(real.input_size))

    target = main.calc(int(param,2))
    print('output is {}'.format(np.binary_repr(target, real.output_size)))
    accept = input('do you accept the answer? (y/n): ')
    if accept == 'y':
        add_experience(param, target, '1')
    elif accept == 'n':
        add_experience(param, target, '0')
    main.fresh_cases()