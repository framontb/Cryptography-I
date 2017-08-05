 
import sys

MSGS = ['jamon', 'jabugo']

# a and b are decoded text
def strxor(a, b):     # xor two strings of different lengths
    if len(a) > len(b):
       return "".join([chr(ord(x) ^ ord(y)) for (x, y) in zip(a[:len(b)], b)])
    else:
       return "".join([chr(ord(x) ^ ord(y)) for (x, y) in zip(a, b[:len(a)])])

def random(size=16):
    return open("/dev/urandom").read(size)

def encrypt(key, msg):
    c = strxor(key, msg)
    print
    print c.encode('hex')
    return c

def main():
    print("OTP...")
    key = random(1024)
    ciphertexts = [encrypt(key, msg) for msg in MSGS]

if __name__ == "__main__":
    main()
