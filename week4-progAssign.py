# -*- coding: utf-8 -*-

'''
Decrypt last block of cypher text
For decrypt one to last, some tweeks are needed:
    - mensage9 = ''
    - indice = 1
    - delete c[2]
    - for i in range(1,17):
'''

import urllib2
import sys
from lib.encrypt import strxor

c = [
    'f20bdba6ff29eed7b046d1df9fb70000',
    '58b1ffb4210a580f748b4ac714c001bd',
    '4a61044426fb515dad3f21f18aa577c0',
    'bdf302936266926ff37dbf7035d5eeb4'
    ]

m = []

TARGET = 'http://crypto-class.appspot.com/po?er='
#--------------------------------------------------------------
# padding oracle
#--------------------------------------------------------------
class PaddingOracle(object):
    def query(self, q):
        target = TARGET + urllib2.quote(q)    # Create query URL
        req = urllib2.Request(target)         # Send HTTP request to server
        try:
            f = urllib2.urlopen(req)          # Wait for response
        except urllib2.HTTPError, e:          
            print "We got: %d" % e.code       # Print response code
            if e.code == 404:
                return True # good padding
            return False # bad padding

def xor(a,b):
    return strxor(a.decode('hex'), b.zfill(32).decode('hex')).encode('hex')

# Create query
def ciphertext(c):
    return ''.join(c)

if __name__ == "__main__":

    # create object
    po = PaddingOracle()

    # Last block need padding 
    mensaje9 = '090909090909090909'
    mensaje = ''
    # Decript last block = 2
    indice = 2

    for i in range(10,17):
        cipherA = list(c)
        cipherA[indice] = xor(cipherA[indice], hex(i).split('x')[-1].zfill(2)*i)

        print "Pad:", hex(i).split('x')[-1].zfill(2)*i
        print "cipher[] = ", cipherA[indice]

        # First g
        for g in range(32,127):
            cipherB = list(cipherA)
            ghex = hex(g).split('x')[-1].zfill(2) + mensaje
            cipherB[indice] = xor(cipherB[indice], ghex +  mensaje9)

            print g, ghex, "Mensaje:", mensaje.decode("hex")
            print cipherB[indice]

            # Issue HTTP query with the given argument
            if po.query(ciphertext(cipherB)):
                break

        print chr(g)
        m.append(chr(g))
        mensaje = ghex
        print "pad: ", mensaje.decode("hex")

'''
'f20bdba6ff29eed7b046d1df9fb70000'   -> c[0]
'58b1ffb4210a580f748b4ac714c001bd'   -> C[1] 'The Magic Words '
'4a61044426fb515dad3f21f18aa577c0'   -> C[2] 'are Squeamish Os'
'bdf302936266926ff37dbf7035d5eeb4'   -> C[3] 'sifrage'
'The Magic Words are Squeamish Ossifrage'
'''
