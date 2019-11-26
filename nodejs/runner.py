import sys
import os


if __name__ == '__main__':

    flow = sys.argv[1]
    mod = __import__(flow)

    secs = flow.split('.')

    for s in secs[1:]:
        mod = getattr(mod, s)

    print(mod)

    f = mod.Main()
    f.main()

    print(f.state)

    # f.debug()